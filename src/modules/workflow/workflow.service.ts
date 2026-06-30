import { Injectable } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { SearchService } from '../search/search.service';
import { InventoryQueryService } from '../inventory-query/inventory-query.service';
import { PurchaseService } from '../purchase/purchase.service';
import { ContextService } from '../context/context.service';
import { CartService } from '../cart/cart.service';
import { RecommendationService } from '../recommendation/recommendation.service';
import { RecentService } from '../recent/recent.service';
import { FrequentlyBoughtService } from '../frequently-bought/frequently-bought.service';
import { AddressService } from '../address/address.service';
import { SessionService } from '../session/session.service';
import { UsersService } from '../users/users.service';
import { StoreProductService } from '../store-product/store-product.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WorkflowService {
  constructor(
    private readonly searchService: SearchService,
    private readonly inventoryQueryService: InventoryQueryService,
    private readonly purchaseService: PurchaseService,
    private readonly contextService: ContextService,
    private readonly cartService: CartService,
    private readonly ordersService: OrdersService,
    private readonly recommendationService: RecommendationService,
    private readonly recentService: RecentService,
    private readonly frequentlyBoughtService: FrequentlyBoughtService,
    private readonly addressService: AddressService,
    private readonly sessionService: SessionService,
    private readonly usersService: UsersService,
    private readonly storeProductService: StoreProductService,
    private prisma: PrismaService,
  ) {}

  async execute(intent: string, query: string) {
    switch (intent) {

      //buy products
      case 'BUY_PRODUCTS':
  return this.buyProducts(query);
  
      case 'SEARCH_PRODUCT':
        return this.searchProduct(query);

      case 'LOW_STOCK':
        return this.checkLowStock();

      case 'PURCHASE_PRODUCT':
        return this.purchaseProduct(query);

      case 'ADD_TO_CART':
        return this.addToCart(query);

        case 'SET_ADDRESS':
  return this.setAddress(query);

case 'SHOW_ADDRESS':
  return this.showAddress();

        case 'SHOW_RECENT':
  return this.recentService.getRecent();

      case 'SHOW_CART':
        return this.showCart();

      case 'CLEAR_CART':
        return this.clearCart();

        case 'CHECKOUT':
  return this.checkout();

  case 'PLACE_ORDER':
  return this.placeOrder();

  case 'SHOW_ORDERS':
  return this.showOrders();

  case 'TRACK_ORDER':
  return this.trackOrder(query);

  case 'CANCEL_ORDER':
  return this.cancelOrder(query);

  case 'CHEAPER_ALTERNATIVE':
  return this.showCheaperAlternative();

case 'SIMILAR_PRODUCTS':
  return this.showSimilarProducts();

  case 'LOGIN':
  return this.login(query);

case 'CURRENT_USER':
  return this.currentUser();

case 'LOGOUT':
  return this.logout();

  case 'CHEAPEST_PRODUCT':
  return this.cheapestProduct(query);

case 'COMPARE_PRICE':
  return this.comparePrice(query);

  

  

      default:
        return {
          success: false,
          message: 'Workflow not implemented yet.',
        };
    }
  }

  //buy products method
  private async buyProducts(
  query: string,
) {
  const userId =
    this.sessionService.getUser();

  if (!userId) {
    return {
      message:
        'Please login first.',
    };
  }

  const text = query
    .replace('buy', '')
    .trim();

  const words = text
    .split(' ')
    .filter(Boolean);

  const items: {
  name: string;
  price: number;
}[] = [];
  let total = 0;

  for (const word of words) {
    const products =
      await this.searchService.search(
        word,
      );

    if (!products.length) {
      continue;
    }

    const product =
      products[0];

    await this.cartService.addItem(
      userId,
      {
        productId:
          product.id,
        quantity: 1,
      },
    );

    items.push({
      name:
        product.name,
      price:
        product.sellingPrice,
    });

    total +=
      product.sellingPrice;
  }

  if (items.length === 0) {
    return {
      message:
        'No products found.',
    };
  }

  return {
    message:
      'Products added to cart.',
    total,
    items,
  };
}

  // price comparison method
  private async comparePrice(
  query: string,
) {
  const name = query
    .replace('compare', '')
    .replace('prices', '')
    .trim();

  const prices =
    await this.storeProductService.getPrices(
      name,
    );

  if (prices.length === 0) {
    return {
      message: 'No stores found.',
    };
  }

  return prices;
}

  // cheapestProduct method
  private async cheapestProduct(
  query: string,
) {
  const name = query
    .replace('cheapest', '')
    .trim();

  const product =
    await this.storeProductService.getCheapest(
      name,
    );

  if (!product) {
    return {
      message: 'No stores found.',
    };
  }

  return {
    product: product.product.name,
    store: product.store.name,
    price: product.price,
  };
}

  // Implement the methods for each intent here

  //login method
  private async login(query: string) {
  const name = query
    .replace('login', '')
    .trim();

  if (!name) {
    return {
      message:
        'Please provide a username.',
    };
  }

  let user =
    await this.usersService.findByName(
      name,
    );

  if (!user) {
    user =
      await this.usersService.createGuest(
        name,
      );
  }

  this.sessionService.setUser(
    user.id,
  );

  return {
    message:
      `👋 Welcome ${user.name}`,
  };
}

// currentUser method
private async currentUser() {
  const userId =
    this.sessionService.getUser();

  if (!userId) {
    return {
      message:
        'No user logged in.',
    };
  }

  const user =
    await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

  if (!user) {
    return {
      message:
        'No user logged in.',
    };
  }

  return {
    message:
      `👤 Logged in as: ${user.name}`,
    };
}

// logout method

private logout() {
  this.sessionService.clear();

  return {
    message:
      'Logged out.',
  };
}


  private getCurrentUserId() {
  const userId =
    this.sessionService.getUser();

  if (!userId) {
    throw new Error(
      'Please login first.',
    );
  }

  return userId;
}

  private async showSimilarProducts() {
  const lastProduct =
    this.contextService.getLastProduct();

  if (!lastProduct) {
    return {
      message:
        'Please search for a product first.',
    };
  }

  const product =
    await this.searchService.findByName(
      lastProduct,
    );

  if (!product) {
    return {
      message: 'Product not found.',
    };
  }

  const similarProducts =
    await this.searchService.findSimilarProducts(
      product.id,
      product.brand ?? undefined,
    );

  return {
    product,
    similarProducts,
  };
}

private async showCheaperAlternative() {
  const lastProduct =
    this.contextService.getLastProduct();

  if (!lastProduct) {
    return {
      message:
        'Please search for a product first.',
    };
  }

  const product =
    await this.searchService.findByName(
      lastProduct,
    );

  if (!product) {
    return {
      message: 'Product not found.',
    };
  }

  const cheaperProducts =
    await this.searchService.findCheaperProducts(
      product.sellingPrice,
    );

  return {
    product,
    cheaperProducts,
  };
}

  private setAddress(query: string) {
  const address = query
    .replace('set address', '')
    .trim();

  if (!address) {
    return {
      message:
        'Please provide an address.',
    };
  }

  this.addressService.setAddress(
    address,
  );

  return {
    message:
      `📍 Address saved:\n${address}`,
  };
}


private showAddress() {
  const address =
    this.addressService.getAddress();

  if (!address) {
    return {
      message:
        'No address saved.',
    };
  }

  return {
    message:
      `📍 Delivery Address\n\n${address}`,
  };
}

  private async placeOrder() {
  const userId =
    this.getCurrentUserId();

  const cart =
    await this.cartService.getCart(
      userId,
    );

  if (cart.length === 0) {
    return {
      message:
        'Your cart is empty.',
    };
  }

  const orderId =
    'ORD-' +
    Date.now()
      .toString()
      .slice(-6);

  let totalAmount = 0;

  for (const item of cart) {
  try {
    totalAmount +=
      item.product.sellingPrice *
      item.quantity;

    await this.ordersService
      .reduceInventory(
        item.productId,
        item.quantity,
      );

    await this.ordersService
      .create({
        customer: userId,
        totalPrice:
          item.product
            .sellingPrice *
          item.quantity,
        status: 'PLACED',
        productId:
          item.productId,
      });

  } catch (err: any) {
    return `❌ ${
      item.product.name
    } is out of stock.`;
  }
}

  const totalItems =
    cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0,
    );

  const address =
    this.addressService.getAddress();

  await this.cartService.clearCart(
    userId,
  );

  this.contextService.clear();

  return {
    message:
      '🎉 Order Placed',
    orderId,
    totalItems,
    totalAmount,
    address,
  };
}

  private async checkout() {
  const userId =
    this.sessionService.getUser();

  if (!userId) {
    return {
      message: 'Please login first.',
    };
  }

  const cart =
    await this.cartService.getCart(
      userId,
    );

  if (cart.length === 0) {
    return {
      message:
        'Your cart is empty.',
    };
  }

  let total = 0;

  const items = cart.map(
    (item) => {
      const price =
        item.product.sellingPrice;

      total +=
        price * item.quantity;

      return {
        name:
          item.product.name,
        quantity:
          item.quantity,
        price,
        subtotal:
          price *
          item.quantity,
      };
    },
  );

  return {
    message:
      'Order Summary',
    totalItems:
      cart.length,
    totalAmount:
      total,
    items,
  };
}

private async searchProduct(query: string) {
  const products =
    await this.searchService.search(query);

  if (products.length > 0) {
    this.contextService.setLastProduct(
      products[0].name,
    );

    this.recentService.add(
      products[0].name,
    );

    const recommendations =
      await this.recommendationService.recommend(
        products[0].id,
      );

      const frequentlyBought =
  this.frequentlyBoughtService.get(
    products[0].name,
  );

    return {
      products,
      recommendations,
      frequentlyBought,
    };
  }

  return products;
}

  private async checkLowStock() {
    return this.inventoryQueryService.lowStock();
  }

  private async purchaseProduct(message: string) {
    return {
      message: 'Purchase workflow',
      lastProduct: this.contextService.getLastProduct(),
      userMessage: message,
    };
  }


  private async trackOrder(query: string) {
  const id = query.replace('track', '').trim();

  const order = await this.ordersService.findOne(id);

  if (!order) {
    return {
      message: 'Order not found.',
    };
  }

  return order;
}




private async cancelOrder(query: string) {
  const id = query.replace('cancel', '').trim();

  return this.ordersService.cancel(id);
}


  private async addToCart(query: string) {
  const quantity =
    Number(query.replace(/\D/g, '')) || 1;

  const lastProduct =
    this.contextService.getLastProduct();

  if (!lastProduct) {
    return {
      message:
        'Please search for a product first.',
    };
  }

  const product =
    await this.searchService.findByName(
      lastProduct,
    );

  if (!product) {
    return {
      message: 'Product not found.',
    };
  }

  const stock =
    product.inventory?.quantity ?? 0;

  // Out of stock
  if (stock === 0) {
    return {
      message: `${product.name} is currently out of stock.`,
    };
  }

  // Not enough stock
  if (quantity > stock) {
    return {
      message: `Sorry, only ${stock} units of ${product.name} are available.`,
    };
  }

  const userId =
  this.getCurrentUserId();

await this.cartService.addItem(
  userId,
  {
    productId: product.id,
    quantity,
  },
);

  return {
    message: `${quantity} x ${product.name} added to cart.`,
  };
}

  private async showCart() {
  const userId =
    this.getCurrentUserId();

  return this.cartService.getCart(
    userId,
  );
}

  private async clearCart() {
  const userId =
    this.getCurrentUserId();

  return await this.cartService.clearCart(
    userId,
  );
}

  private async showOrders() {
  const userId =
    this.getCurrentUserId();

  return this.ordersService.findByCustomer(
    userId,
  );
}



}