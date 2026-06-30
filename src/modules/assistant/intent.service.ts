import { Injectable } from '@nestjs/common';

@Injectable()
export class IntentService {
  detect(query: string): string {
    const text = query.toLowerCase().trim();
    


    //buy products
    if (text.startsWith('buy ')) {
  return 'BUY_PRODUCTS';
}

    if (text.includes('cheapest')) {
  return 'CHEAPEST_PRODUCT';
}

if (text.includes('compare')) {
  return 'COMPARE_PRICE';
}
    

    if (text.startsWith('login')) {
  return 'LOGIN';
}

if (text === 'who am i') {
  return 'CURRENT_USER';
}

if (
  text === 'logout' ||
  text === 'log out' ||
  text === 'sign out'
) {
  return 'LOGOUT';
}


    if (
  text.startsWith('set address')
) {
  return 'SET_ADDRESS';
}



if (
  text === 'address'
) {
  return 'SHOW_ADDRESS';
}

    // Show orders
if (
  text === 'orders' ||
  text === 'show orders' ||
  text === 'my orders'
) {
  return 'SHOW_ORDERS';
}

if (text.startsWith('track')) {
  return 'TRACK_ORDER';
}


if (text.startsWith('cancel')) {
  return 'CANCEL_ORDER';
}


    // Place order
    if (
      text === 'place order' ||
      text === 'confirm order'
    ) {
      return 'PLACE_ORDER';
    }

    // Checkout
    if (text === 'checkout') {
      return 'CHECKOUT';
    }

    // Clear cart
    if (
      text.includes('clear cart') ||
      text.includes('empty cart')
    ) {
      return 'CLEAR_CART';
    }

    // Show cart
    if (
      text === 'cart' ||
      text.includes('show cart') ||
      text.includes('my cart')
    ) {
      return 'SHOW_CART';
    }

    // Add to cart
    if (text.startsWith('add')) {
      return 'ADD_TO_CART';
    }

    // Purchase
    if (
      text.includes('buy') ||
      text.includes('purchase')
    ) {
      return 'PURCHASE_PRODUCT';
    }

    // Low stock
    if (
      text.includes('low stock') ||
      text.includes('out of stock')
    ) {
      return 'LOW_STOCK';
    }

    if (
  text === 'recent' ||
  text === 'recent products' ||
  text === 'recently viewed'
) {
  return 'SHOW_RECENT';
}


if (
  text.includes('cheaper') ||
  text.includes('cheap')
) {
  return 'CHEAPER_ALTERNATIVE';
}

if (
  text.includes('similar')
) {
  return 'SIMILAR_PRODUCTS';
}

    // Search
    if (
      text.includes('find') ||
      text.includes('search') ||
      text.includes('have') ||
      text.includes('stock') ||
      text.includes('price')
    ) {
      return 'SEARCH_PRODUCT';
    }

    // Single word or short query
    if (text.split(' ').length <= 3) {
      return 'SEARCH_PRODUCT';
    }

    return 'UNKNOWN';
  }
}