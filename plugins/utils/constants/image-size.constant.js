export default {
  brand: {
    banner: process.env.VUE_APP_IMAGESIZE_BRAND_BANNER || "1080 x 810",
    background: process.env.VUE_APP_IMAGESIZE_BRAND_BACKGROUND || "1080 x 811",
    preview: process.env.VUE_APP_IMAGESIZE_BRAND_PREVIEW || "360 x 361"
  },
  outlet: {
    preview: process.env.VUE_APP_IMAGESIZE_OUTLET_PREVIEW || "1080 x 606"
  },
  rewards: {
    preview: process.env.VUE_APP_IMAGESIZE_REWARD_PREVIEW || "1080 x 720"
  },
  "point-multiplier": {
    icon: process.env.VUE_APP_IMAGESIZE_POINTMULTIPLIER_ICON || "144 x 144"
  },
  "birthday-free-item": {
    image: process.env.VUE_APP_IMAGESIZE_BDAYFREEITEM_IMAGE || "1080 x 720",
    icon: process.env.VUE_APP_IMAGESIZE_BDAYFREEITEM_ICON || "144 x 144"
  },
  "birthday-discount": {
    image: process.env.VUE_APP_IMAGESIZE_BDAYDISCOUNT_IMAGE || "1080 x 720",
    icon: process.env.VUE_APP_IMAGESIZE_BDAYDISCOUNT_ICON || "144 x 144"
  },
  "manual-benefit": {
    icon: process.env.VUE_APP_IMAGESIZE_MANUALBENEFIT_ICON || "144 x 144"
  },
  "news-promo": {
    image: process.env.VUE_APP_IMAGESIZE_NEWSPROMO_IMAGE || "1080 x 720"
  },
  tier: {
    icon: process.env.VUE_APP_IMAGESIZE_TIER_ICON || "144 x 144"
  }
};
