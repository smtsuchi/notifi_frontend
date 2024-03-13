export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        useGrouping: true,
    }).format(price)
};

export const formatUrl = (url: string) => {
    try {
        const { origin, pathname } = new URL(url);
        const strippedUrl = `${origin}${pathname}`
        return strippedUrl
    }
    catch {
        return url
    }
};

export const validateUrl = (url: string, site='amazon') => {
    try {
        const { origin, pathname } = new URL(url);
        if (site === 'amazon' && !origin.includes('amazon.com')){
            return {
                status: 'not ok',
                message: 'Please enter a valid Amazon URL.'
            }
        }
        const strippedUrl = `${origin}${pathname}`
        return {
            status: 'ok',
            message: strippedUrl,
        }
    }
    catch {
        return {
            status: 'not ok',
            message: 'Please enter a valid URL.'
        }
    }
}
;