import type { Schema, Struct } from '@strapi/strapi';

export interface DestinationItineraryDay extends Struct.ComponentSchema {
  collectionName: 'components_destination_itinerary_days';
  info: {
    displayName: 'Jour du programme';
    icon: 'calendar';
  };
  attributes: {
    day: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    description: Schema.Attribute.Text;
    meals: Schema.Attribute.String;
    overnight: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SettingsPricing extends Struct.ComponentSchema {
  collectionName: 'components_settings_pricings';
  info: {
    description: 'Tarifs utilis\u00E9s pour le calcul automatique du prix total des r\u00E9servations';
    displayName: 'Tarifs des options';
    icon: 'priceTag';
  };
  attributes: {
    accommodationLuxuryPerNight: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<140>;
    accommodationStandardPerNight: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<35>;
    accommodationSuperiorPerNight: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<70>;
    childAccommodationRatio: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.5>;
    privateGuidePerDay: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<90>;
    transportPerPerson: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<60>;
  };
}

export interface SharedListItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_list_items';
  info: {
    displayName: '\u00C9l\u00E9ment de liste';
    icon: 'bulletList';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedOpeningHour extends Struct.ComponentSchema {
  collectionName: 'components_shared_opening_hours';
  info: {
    displayName: "Horaires d'ouverture";
    icon: 'clock';
  };
  attributes: {
    closed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    hours: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Meta title / description / image de partage';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 170;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    noIndex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'R\u00E9seau social';
    icon: 'link';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      [
        'facebook',
        'instagram',
        'tiktok',
        'youtube',
        'x',
        'tripadvisor',
        'linkedin',
        'pinterest',
      ]
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'destination.itinerary-day': DestinationItineraryDay;
      'settings.pricing': SettingsPricing;
      'shared.list-item': SharedListItem;
      'shared.opening-hour': SharedOpeningHour;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
    }
  }
}
