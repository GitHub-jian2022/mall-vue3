import CreateOrder from '../../views/CreateOrder.vue'
import User from '../../views/User.vue'
import Setting from '../../views/Setting.vue'
import Address from '../../views/Address.vue'
import AddressEdit from '../../views/AddressEdit.vue'
import Order from '../../views/Order.vue'
import OrderDetail from '../../views/OrderDetail.vue'
import Collection from '../../views/Collection.vue'

export default [
    {
        path: '/create-order',
        name: 'create-order',
        meta: {
          index: 2
        },
        component: CreateOrder
      },
      {
        path: '/order',
        name: 'order',
        meta: {
          index: 2
        },
        component: Order
      },
      {
        path: '/order-detail',
        name: 'order-detail',
        meta: {
          index: 3
        },
        component: OrderDetail
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          index: 2
        },
        component: User
      },
      {
        path: '/collection',
        name: 'collection',
        meta: {
          index: 2
        },
        component: Collection
      },
      {
        path: '/setting',
        name: 'setting',
        meta: {
          index: 2
        },
        component: Setting
      },
      {
        path: '/address',
        name: 'address',
        meta: {
          index: 2
        },
        component: Address
      },
      {
        path: '/address-edit',
        name: 'address-edit',
        meta: {
          index: 3
        },
        component: AddressEdit
      },
]