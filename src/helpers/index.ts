import { SubscriptionType } from "../types/entities/SubscriptionType";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    useGrouping: true,
  }).format(price);
};

export const formatUrl = (url: string) => {
  try {
    const { origin, pathname } = new URL(url);
    const strippedUrl = `${origin}${pathname}`;
    return strippedUrl;
  } catch {
    return url;
  }
};

export const validateUrl = (url: string, site = "amazon") => {
  try {
    const urlObj = new URL(url);
    const { origin } = urlObj;
    let { pathname } = urlObj;
    if (site === "amazon" && !origin.includes("amazon.com")) {
      return {
        status: "not ok",
        message: "Please enter a valid Amazon URL.",
      };
    }
    try {
      pathname = pathname.split("/").slice(0, 4).join("/");
    } catch {
      return {
        status: "not ok",
        message: "Please enter a valid Amazon Product URL.",
      };
    }

    const strippedUrl = `${origin}${pathname}`;
    return {
      status: "ok",
      message: strippedUrl,
    };
  } catch {
    return {
      status: "not ok",
      message: "Please enter a valid URL.",
    };
  }
};

export const getSubscriptionsGroupedByProductId = (
  subscriptions: SubscriptionType[]
) => {
  const productIds = new Set();
  const filteredSubscriptions = [];
  for (const subscription of subscriptions) {
    if (!productIds.has(subscription.product_id)) {
      filteredSubscriptions.push(subscription);
      productIds.add(subscription.product_id);
    }
  }
  return filteredSubscriptions;
};

export const truncateStrings = (array: string[], maxLength = 65) => {
  const ellipsis = "...";

  const truncatedArray = array.map((str) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength - ellipsis.length) + ellipsis;
    }
    return str;
  });

  return truncatedArray;
};
export const truncateString = (str: string, maxLength = 65) => {
  const ellipsis = "...";

  if (str.length > maxLength) {
    return str.slice(0, maxLength - ellipsis.length) + ellipsis;
  }
  return str;
};
