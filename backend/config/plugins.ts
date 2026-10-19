import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => {
  /**
   * Stockage des médias : disque local du VPS par défaut (public/uploads, monté en volume Docker).
   * Option : UPLOAD_PROVIDER=cloudinary ou aws-s3, après installation du provider correspondant
   * (@strapi/provider-upload-cloudinary ou @strapi/provider-upload-aws-s3) — voir README.
   */
  const uploadProvider = env('UPLOAD_PROVIDER', 'local');
  const actionOptions = { upload: {}, uploadStream: {}, delete: {} };

  const uploadConfigs = {
    cloudinary: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions,
    },
    'aws-s3': {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('S3_CDN_URL'),
        s3Options: {
          credentials: {
            accessKeyId: env('S3_ACCESS_KEY_ID'),
            secretAccessKey: env('S3_ACCESS_SECRET'),
          },
          region: env('S3_REGION'),
          endpoint: env('S3_ENDPOINT'),
          params: { Bucket: env('S3_BUCKET') },
        },
      },
      actionOptions,
    },
    local: {
      sizeLimit: 25 * 1024 * 1024,
      breakpoints: { xlarge: 1920, large: 1280, medium: 768, small: 480 },
    },
  };

  return {
    upload: {
      config: uploadConfigs[uploadProvider as keyof typeof uploadConfigs] ?? uploadConfigs.local,
    },
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('SMTP_HOST', 'localhost'),
          port: env.int('SMTP_PORT', 587),
          secure: env.bool('SMTP_SECURE', false),
          auth: env('SMTP_USERNAME')
            ? { user: env('SMTP_USERNAME'), pass: env('SMTP_PASSWORD') }
            : undefined,
        },
        settings: {
          defaultFrom: env('EMAIL_FROM', 'Atlas Horizons Voyages <no-reply@example-agence.ma>'),
          defaultReplyTo: env('EMAIL_REPLY_TO', 'contact@example-agence.ma'),
        },
      },
    },
    'users-permissions': {
      config: {
        jwtSecret: env('JWT_SECRET'),
      },
    },
  };
};

export default config;
