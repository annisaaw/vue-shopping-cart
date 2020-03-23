<template>
	<div class="bg-gray-300 w-full flex items-center h-screen justify-center">
		<form class="bg-red-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/4" @submit.prevent="login()">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-orange-100" id="username" type="text" placeholder="Username" v-model="username" :class="{ 'border-red-600' : error }">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Password</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-orange-100" id="username" type="password" placeholder="Password" v-model="password" :class="{ 'border-red-600' : error }">
          </div>
            <p class="text-red-600 text-xs italic text-center py-2" v-if="error">Wrong username or password.</p>
          <div class="flex items-center justify-center">
            <input class="bg-gray-600 hover:bg-white hover:text-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none" type="submit" value="Sign In">
          </div>
		</form>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
		data(){
			return{
				username: 'admin',
				password: 'admin',
				error: false
			}
		},
		methods: {
			...mapActions({
               fetchUser: 'fetchUser'
			}),
			login(){
				let getUser = this.users.findIndex(obj => obj.username === this.username && obj.password === this.password);
				if(getUser == -1){
					this.error = true;
					return
				} else {
					this.$router.push({ name: 'product' });
				}
					this.$cookies.set('userlogin',this.users[getUser].username,'5h');
			}
		},
		computed: {
			...mapGetters({
				users: 'users',
			}),
		},
		created(){
			this.fetchUser();
		},
		beforeRouteEnter (to, from, next) {
			window.$cookies.get('userlogin') ? next({ name: 'product' }) : next()
		},
    }
</script>

<style>
</style>