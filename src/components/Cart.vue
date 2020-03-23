<template>
	<div class="">
		<div class="m-3 w-full">
			<div class="py-1 rounded rounded-b-none text-center font-bold text-white">
				<button class="inline-block border border-gray-600 rounded hover:border-gray-600 text-white hover:bg-gray-600 py-1 px-3 my-1 hover:text-white w-full shadow-lg bg-blue-500 font-bold" @click="checkOut()">Check Out</button>
			</div>
			<div class="justify-between flex bg-white px-2 py-2 rounded text-center text-gray-600 border-gray-600 shadow-lg">
				<span>Total</span>
				<span class="font-bold">Rp {{ totalPrice(Cart) }}</span>
			</div>

			<div class="my-3 w-full ">
				<div class="bg-gray-600 py-1 rounded rounded-b-none text-center font-bold text-white">Cart</div>
				<div class="justify-between flex bg-white px-2 py-2 rounded-t-none rounded text-sm border-gray-600 shadow-lg flex-wrap">

					<div class="w-full border-t-0 border-b-2 border-gray-600" v-for="(item, key) in counterCart" :key="key">
						<span class="justify-between flex px-1 text-center font-bold">{{ item.name }}</span>
						<div class="justify-between flex px-1 py-1 text-center">
							<div>
								<span>Rp {{ item.price }} x</span><span>{{ countItem(item) }}</span>
							</div>
							<span class="font-bold">Rp {{ cumulativePrice(item) }}</span>
						</div>
						<div class="justify-between flex px-1 py-1 text-center">
							<button class="inline-block border border-gray-600 rounded hover:border-gray-600 text-gray-600 hover:bg-gray-600 py-1 px-3 my-1 hover:text-white" @click="removeItem(item)">Remove</button>
							<div>
								<button class="inline-block border border-gray-600 rounded hover:border-gray-600 text-gray-600 hover:bg-gray-600 py-1 px-3 my-1 mx-1 hover:text-white"  @click="send(item)">+</button>
								<button class="inline-block border border-gray-600 rounded hover:border-gray-600 text-gray-600 hover:bg-gray-600 py-1 px-3 my-1 mx-1 hover:text-white" @click="decreaseItem(item)">-</button>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed:{
		...mapGetters({
			Cart : 'cart',
			counterCart : 'counterCart'
		})
    },
    watch: {
		Cart(){

		}
    },
    methods: {
		...mapActions({
			setCart: 'addCart',
			decreaseCart: 'decreaseCart',
			removeCart: 'removeCart'
		}),
		countItem(i){
			return this.Cart.filter(d => d.id === i.id).length;
		},
		cumulativePrice(i){
			return i.price * this.countItem(i);
		},
		totalPrice(i){
			return i.reduce(function(total, item){
				return total + item.price
			}, 0);
		},
		send(i){
			this.setCart(i);
		},
		decreaseItem(i){
			this.decreaseCart(i);
		},
		removeItem(i){
			this.removeCart(i);
		},
		checkOut(){
			this.$router.push({ name: 'bill', query: { back : this.$route.fullPath } });
		}
    }
}
</script>

<style>
</style>