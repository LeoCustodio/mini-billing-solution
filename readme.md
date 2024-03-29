# **Mini-Billing-Solution**
    A simple application composed for 3 microservices (Customers, Transactions, Receipt).
    NodeJs,RabbitMQ, MongoDB, ReactJs


## **Features**
    Interface: Easily create, search and delete Customers and Transactions.
    Authentication: JsonWebToken Athentification created by login method.
## Learning Project
Please note that as a learning project, the code here may not follow best practices at all times as it's a process of learning and improving.


## **Usage**

To deploy the Mini-Billing-Solution, follow these steps:

    Customers:

        1. Clone the repository: https://github.com/LeoCustodio/mini-billing-solution.git
        2. Navegate to the project Directory: cd src/Microservices/Customers
        3. gcloud app deploy app.yaml

    Transactions:

        1. Clone the repository: https://github.com/LeoCustodio/mini-billing-solution.git
        2. Navegate to the project Directory: cd src/Microservices/Transactions
        3. gcloud app deploy app.yaml

    Receipt:

        1. Clone the repository: https://github.com/LeoCustodio/mini-billing-solution.git
        2. Navegate to the project Directory: cd src/Microservices/Receipt
        3. gcloud app deploy app.yaml
    
    CustomersWeb:

        1. Clone the repository: https://github.com/LeoCustodio/mini-billing-solution.git
        2. Navegate to the project Directory: cd CustomersWeb
        3. Build the application: npm run build
        4. gcloud app deploy app.yaml

## The application can be accessed using the following URLs:
        
        Customers: https://mini-billing-customersapi.rj.r.appspot.com/
        
        Transactions: https://mini-billing-transactionsapi.rj.r.appspot.com/
        
        Receipt: https://mini-billing-receiptapi.rj.r.appspot.com/
        
        CustomersWeb: https://mini-billing-solution.uc.r.appspot.com/
