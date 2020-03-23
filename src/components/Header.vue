<template>
  <nav class="flex h-auto justify-between flex-wrap p-2 bg-red-400">

   <div class="w-auto">
	<ul class="flex">
		<li class="mr-3">
			<span class="inline-block text-white py-1 px-3 font-bold">Shopping Cart</span>
		</li>
		<li class="mr-3">
			<router-link :to="{ name: 'product' }" tag="a" class="inline-block border border-white rounded hover:border-gray-200 text-white hover:bg-white py-1 px-3 hover:text-red-400">All Products</router-link>
		</li>
		<li class="mr-3" v-for="(cat,key) in categories" :key="key">
			<router-link  :to="{ name: 'product', query: { category: cat } }" tag="a" class="inline-block border border-white rounded hover:border-gray-200 text-white hover:bg-white py-1 px-3 hover:text-red-400">{{ cat }}</router-link>
		</li>
	</ul>
   </div>

   <div class="w-auto">
	<span class="inline-block text-white py-1 px-3 font-bold">
		Hi, {{ isLoggedIn }}
	</span>
	<button class="inline-block border border-white rounded hover:border-gray-200 text-white hover:bg-white py-1 px-3 hover:text-red-400 mr-3" @click.prevent="logOut()">Logout</button>
   </div>

  </nav>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
      computed:{
        ...mapGetters({
          categories: 'categories',
        }),
        isLoggedIn(){
          return this.$cookies.get('userlogin') ? this.$cookies.get('userlogin') : '';
        }
      },
      methods:{
        ...mapActions({
          fetchCategory: 'fetchCategory',
        }),
        logOut(){
          this.$cookies.remove('userlogin');
          this.$router.push({ name: 'login' });
        }
      },
      created(){
        this.fetchCategory();
      },
    }
</script>