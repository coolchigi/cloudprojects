module.exports.CostCalculator = async (event) => {
    try{
        if (event == null){
            throw new Error('Event object is undefined or empty')
        }

        const {price, size, unit, downPayment, downPaymentAmount } = event ?? {};

      const sizeInSqFt = Number(convertSizeToSqFt(size, unit));
      
      // Calculate the price per square foot to one decimal place
      const pricePerUnit = Number((price / sizeInSqFt).toFixed(1));

      const medianPrice = downPayment
        ? (parseFloat(price) - (parseFloat(downPayment) / 100) * parseFloat(price)).toFixed(1)
        : downPaymentAmount
          ? (parseFloat(price) - (parseFloat(downPaymentAmount) / 100) * parseFloat(price)).toFixed(1)
          : (() => {
            throw new Error('Missing downPayment or downPaymentAmount');
          })();
      
      // Calculate the total cost by adding the price and the down payment (if it exists)
      const totalCost = (parseFloat(price) + Number(downPaymentAmount ?? 0)).toFixed(1);
      
      // Return a response object with a 200 status code and JSON body
      const response = {
        statusCode: 200,
        body: JSON.stringify({ pricePerUnit: pricePerUnit.toFixed(1).toString(), medianPrice: medianPrice.toString(), totalCost: totalCost.toString() }),
        headers: {
          'X-Powered-By': 'AWS API Gateway & Lambda Serverless'
        },
        isBase64Encoded: false
      };

      return response;
    }catch (error) {
      // Log the error and return a response object with a 400 status code and an error message
      console.error('Error parsing request body:', error.message);
      return {
        statusCode: 400,
        body: 'Error parsing request body',
        headers: {
          'X-Powered-By': 'AWS API Gateway & Lambda Serverless'
        },
        isBase64Encoded: false
      };
    }
}

function convertSizeToSqFt(size, unit) {
    return unit === 'sqFt' ? parseFloat(size) :
           unit === 'sqM' ? parseFloat(size) * 10.7639 :
           
           (() => { throw new Error('Unsupported unit "' + unit + '"'); })();
}
