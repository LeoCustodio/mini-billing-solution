const routes = [
    //Customers Routes
    {
        url: '/customers',
        auth: true,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:8081",
            changeOrigin: true,
            pathRewrite: {
                [`^/customers`]: '/',
            },
        }
    },
    {
        url: '/customer/makedeposit',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:8081",
            changeOrigin: true,
            pathRewrite: {
                [`^/customer/makedeposit`]: '',
            },
        }
    },
    {
        url: '/customer/makepayment',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:8081",
            changeOrigin: true,
            pathRewrite: {
                [`^/customer/makepayment`]: '',
            },
        }
    },
    {
        url: '/customer/searchcustomers',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:8081",
            changeOrigin: true,
            pathRewrite: {
                [`^/customer/searchcustomers`]: '/customer/searchcustomers',
            },
        }
    },
    {
        url: '/customer/create',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:8081",
            changeOrigin: true,
            pathRewrite: {
                [`^/customer/create`]: '',
            },
        }
    },
    {
        url: '/customer/searchcustomer/name',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:8081",
            changeOrigin: true,
            pathRewrite: {
                [`^/customer/searchcustomer/name`]: '',
            },
        }
    },
    {
        url: '/customer/gettransactions/:customerName',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:8081",
            changeOrigin: true,
            pathRewrite: {
                [`^/customer/gettransactions/:customerName`]: '',
            },
        }
    },
    //////End of Customers Routes

    //////Auth Routes
    {
        url: '/register',
        auth: false,
        creditCheck: true,
        proxy: {
            target: "http://localhost:8081",
            changeOrigin: true,
            pathRewrite: {
                [`^/register`]: 'register',
            },
        }
    },
    {
        url: '/login',
        auth: false,
        creditCheck: true,
        proxy: {
            target: "http://localhost:8081",
            changeOrigin: true,
            pathRewrite: {
                [`^/login`]: '/login',
            },
        }
    },

]

exports.routes = routes;