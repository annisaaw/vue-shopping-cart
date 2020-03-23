<template>
  <div class="w-full w-full relative min-h-screen">
	<app-header></app-header>
	<div class="flex justify-between flex-wrap">
		<div class="w-3/4 flex flex-wrap justify-center">

			<div class="max-w-xs rounded overflow-hidden shadow-lg m-1"  v-for="(item, key) in filter" :key="key">
				<img class="w-full" :src="item.image" :alt="item.name">
				<div class="px-6 py-4">
					<div class="font-bold text-sm mb-2 text-gray-600">{{ item.name }}</div>
					<div class="font-bold text-sm mb-2">Rp {{ item.price }}</div>
					<p class="text-gray-700 text-sm">
					{{ item.description }}
					</p>
				</div>
				<div class="px-6 py-4">
					<button class="w-full inline-block border border-red-400 rounded hover:border-gray-200 text-red-400 hover:bg-red-400 py-1 px-3 hover:text-white" @click="send(item)">Add To Cart</button>
				</div>
			</div>

		</div>
		<app-cart class="w-1/4 bg-red-200 flex flex-wrap"></app-cart>
	</div>
  </div>
</template>

<script>
import AppHeader from './Header.vue'
import AppCart from './Cart.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    components:{
        AppHeader,
        AppCart
    },
    data() {
		return{
			cat: this.$route.query.category,
		}
    },
	watch:{
		'$route'(to){
			this.cat = to.query.category;
			this.fetchProducts();
		}
	},
	methods:{
		...mapActions({
			fetchProducts: 'fetchProducts',
			setCart: 'addCart'
		}),
		send(item){
			this.setCart(item);
		}
	},
	computed:{
		...mapGetters({
			products: 'products',
		}),
		filter(){
			return this.cat === undefined ? this.products : this.products.filter(d => d.category == this.cat)
		}
	},
	created(){
		this.fetchProducts();
	},
    beforeRouteEnter (to, from, next) {
      window.$cookies.get('userlogin') ? next() : next({ name: 'login', query: { redirect: 'product' } })
    },
}
</script>

<style>
</style>