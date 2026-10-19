import type { ReactNode } from 'react';
import Image from 'next/image';
import { mediaUrl } from '@/lib/site';

/**
 * Rendu des champs « blocks » de Strapi 5. Tout le texte passe par React (échappement
 * automatique) : aucun HTML brut n'est injecté. Les liens externes sont ouverts en noopener.
 */

type TextNode = {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};
type LinkNode = { type: 'link'; url: string; children: TextNode[] };
type InlineNode = TextNode | LinkNode;
type ListItemNode = { type: 'list-item'; children: InlineNode[] };

export type Block =
  | { type: 'paragraph'; children: InlineNode[] }
  | { type: 'heading'; level: 1 | 2 | 3 | 4 | 5 | 6; children: InlineNode[] }
  | { type: 'list'; format: 'ordered' | 'unordered'; children: Array<ListItemNode | Extract<Block, { type: 'list' }>> }
  | { type: 'quote'; children: InlineNode[] }
  | { type: 'code'; children: TextNode[] }
  | {
      type: 'image';
      image: { url: string; alternativeText?: string | null; width?: number; height?: number };
      children?: InlineNode[];
    };

export type BlocksContent = Block[];

function renderText(node: TextNode, key: number): ReactNode {
  let out: ReactNode = node.text;
  if (node.code) out = <code className="rounded bg-sand-100 px-1">{out}</code>;
  if (node.bold) out = <strong>{out}</strong>;
  if (node.italic) out = <em>{out}</em>;
  if (node.underline) out = <u>{out}</u>;
  if (node.strikethrough) out = <s>{out}</s>;
  return <span key={key}>{out}</span>;
}

function isSafeUrl(url: string) {
  return /^(https?:|mailto:|tel:|\/)/i.test(url);
}

function renderInline(nodes: InlineNode[] = []): ReactNode[] {
  return nodes.map((node, i) => {
    if (node.type === 'link') {
      if (!isSafeUrl(node.url)) return <span key={i}>{node.children.map(renderText)}</span>;
      const external = /^https?:/i.test(node.url);
      return (
        <a key={i} href={node.url} className="font-medium text-majorelle-600 underline underline-offset-2" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {node.children.map(renderText)}
        </a>
      );
    }
    return renderText(node, i);
  });
}

function renderList(block: Extract<Block, { type: 'list' }>, key: number): ReactNode {
  const Tag = block.format === 'ordered' ? 'ol' : 'ul';
  return (
    <Tag key={key} className={block.format === 'ordered' ? 'list-decimal ps-6' : 'list-disc ps-6'}>
      {block.children.map((child, i) =>
        child.type === 'list' ? renderList(child, i) : <li key={i}>{renderInline(child.children)}</li>
      )}
    </Tag>
  );
}

export function BlocksRenderer({ content, className = '' }: { content?: BlocksContent | null; className?: string }) {
  if (!content?.length) return null;
  return (
    <div className={`prose-content ${className}`}>
      {content.map((block, i) => {
        switch (block.type) {
          case 'heading': {
            const Tag = `h${Math.min(Math.max(block.level, 2), 4)}` as 'h2' | 'h3' | 'h4';
            return <Tag key={i}>{renderInline(block.children)}</Tag>;
          }
          case 'list':
            return renderList(block, i);
          case 'quote':
            return <blockquote key={i}>{renderInline(block.children)}</blockquote>;
          case 'code':
            return (
              <pre key={i}>
                <code>{block.children.map((c) => c.text).join('')}</code>
              </pre>
            );
          case 'image': {
            const src = mediaUrl(block.image.url);
            if (!src) return null;
            return (
              <Image
                key={i}
                src={src}
                alt={block.image.alternativeText ?? ''}
                width={block.image.width ?? 1200}
                height={block.image.height ?? 800}
                className="rounded-2xl"
                sizes="(min-width: 1024px) 768px, 100vw"
              />
            );
          }
          default:
            return <p key={i}>{renderInline((block as { children: InlineNode[] }).children)}</p>;
        }
      })}
    </div>
  );
}
