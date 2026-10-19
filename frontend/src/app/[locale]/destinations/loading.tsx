import { Container } from '@/components/ui/primitives';

export default function Loading() {
  return (
    <Container className="py-14" >
      <div className="h-10 w-72 animate-pulse rounded-xl bg-sand-200" />
      <div className="mt-8 h-40 animate-pulse rounded-3xl bg-white" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-96 animate-pulse rounded-[var(--radius-card)] bg-white" />
        ))}
      </div>
    </Container>
  );
}
