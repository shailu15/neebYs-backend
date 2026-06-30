import { Injectable } from '@nestjs/common';

@Injectable()
export class FormatterService {
  format(result: any) {
    if (!result) {
      return 'No response.';
    }


    if (
  result.product &&
  result.similarProducts
) {
  if (
    result.similarProducts.length === 0
  ) {
    return 'No similar products found.';
  }

  const text =
    result.similarProducts
      .map(
        (p: any, index: number) =>
          `${index + 1}. ${p.name}
₹${p.sellingPrice}`,
      )
      .join('\n\n');

  return `🥛 Similar Products

${text}`;
}


    if (
  result.product &&
  result.cheaperProducts
) {
  if (
    result.cheaperProducts.length === 0
  ) {
    return 'No cheaper alternatives found.';
  }

  const text =
    result.cheaperProducts
      .map(
        (p: any, index: number) =>
          `${index + 1}. ${p.name}
₹${p.sellingPrice}`,
      )
      .join('\n\n');

  return `💰 Cheaper Alternatives

${text}`;
}



    if (
  Array.isArray(result) &&
  result.length > 0 &&
  typeof result[0] === 'string'
) {
  const text = result
    .map(
      (item, index) =>
        `${index + 1}. ${item}`,
    )
    .join('\n');

  return `🕒 Recently Viewed

${text}`;
}


    if (
  result.products &&
  result.recommendations
) {
  const product = result.products[0];

  const recommendations =
    result.recommendations.length > 0
      ? result.recommendations
          .map((p: any) => `• ${p.name}`)
          .join('\n')
      : 'No recommendations available.';

  return `${product.name}
₹${product.sellingPrice}
Stock: ${
    product.inventory?.quantity ?? 0
  }

✨ You may also like

${recommendations}`;
}

    // Checkout formatting
    if (result.message === 'Order Summary') {
      const items = result.items
        .map(
          (item: any, index: number) =>
            `${index + 1}. ${item.name}
Qty: ${item.quantity}
₹${item.price}`,
        )
        .join('\n\n');

      return `🧾 Order Summary

${items}

Total Items: ${result.totalItems}
Total Amount: ₹${result.totalAmount}`;
    }

    if (result.message === 'Order Placed') {
  return `🎉 Order Placed Successfully

Order ID: ${result.orderId}
Items: ${result.totalItems}

Thank you for shopping with NeebYs.`;
}


if (
  result.status === 'CANCELLED'
) {
  return `❌ Order Cancelled

Order ID: ${result.id}
Customer: ${result.customer}
Amount: ₹${result.totalPrice}`;
}


    // Plain message objects
    if (result.message) {
      return result.message;
    }

    // Arrays
    if (Array.isArray(result)) {
      // Cart formatting
      if (
        result.length > 0 &&
        result[0].quantity !== undefined
      ) {
        let totalItems = 0;

        const text = result
          .map((item: any, index: number) => {
            totalItems += item.quantity;

            return `${index + 1}. ${item.name}
Qty: ${item.quantity}
Price: ₹${item.price}`;
          })
          .join('\n\n');

        return `🛒 Your Cart

${text}

Total Items: ${totalItems}`;
      }
      

      if (
  Array.isArray(result) &&
  result.length > 0 &&
  result[0].customer !== undefined &&
  result[0].totalPrice !== undefined
) {
  const text = result
    .map(
      (order: any, index: number) =>
        `${index + 1}. Order ID: ${order.id}

Customer: ${order.customer}
Status: ${order.status}
Amount: ₹${order.totalPrice}
Created: ${new Date(
          order.createdAt,
        ).toLocaleString()}`,
    )
    .join('\n\n');

  return `📦 Your Orders

${text}`;
}




      // Product search formatting
      if (result.length === 0) {
        return 'I could not find that product.';
      }

      return result
        .map(
          (product: any) =>
            `${product.name}
₹${product.sellingPrice}
Stock: ${product.inventory?.quantity ?? 0}`,
        )
        .join('\n\n');
    }
    
    if (
  Array.isArray(result) &&
  result.length > 0 &&
  result[0].id &&
  result[0].createdAt
) {
  const text = result
    .map(
      (order: any, index: number) =>
        `${index + 1}. ${order.id}
Status: ${order.status ?? 'PLACED'}
Created: ${new Date(
          order.createdAt,
        ).toLocaleString()}`,
    )
    .join('\n\n');

  return `📦 Your Orders

${text}`;
}

if (
  result.id &&
  result.customer &&
  result.totalPrice !== undefined
) {
  return `📦 Order Details

Order ID: ${result.id}

Customer: ${result.customer}
Status: ${result.status}
Amount: ₹${result.totalPrice}
Created: ${new Date(
    result.createdAt,
  ).toLocaleString()}`;
}

    return JSON.stringify(result, null, 2);
  }
}