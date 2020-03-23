<template>
<div class="bg-gray-300 flex justify-center py-20 min-h-screen">
    <div class="w-full max-w-sm">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <h1 class="text-3xl text-center">Payment</h1>
            </div>
            <div class="mb-4">
              <div class="font-mono" v-for="(item, key) in counterCart" :key="key">
                  <div> {{ item.name }} </div>
                  <div class="flex justify-between pb-1">
                      <div>Rp {{ item.price }} <span class="font-bold">x {{ countItem(item) }}</span></div>
                      <div>Rp {{ cumulativePrice(item) }}</div>
                  </div>
                  <hr class="border-dotted pt-1">
              </div>
            </div>
            <div class="mb-4"><div class="flex justify-between font-mono font-bold"><div>Total</div><div>Rp {{ totalPrice(Cart) }}</div></div></div>
            <div class="flex items-center justify-center">
                <button type="button" class="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none" @click="print()"> Print Bill </button>
            </div>
        </div>
        <div class="text-center">
            <button type="button" class="text-gray-600 font-bold py-2 px-4 rounded focus:outline-none" @click="cancel()"> Cancel </button>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      Cart : 'cart',
      counterCart : 'counterCart'
    })
  },
  methods: {
    ...mapActions({
      printBill: 'printBill',
    }),
    cancel(){
      this.$router.push({ path: this.$route.query.back });
    },
    print(){
        alert("Transaction succeed!")
        this.printBill();
        this.$router.push({name: 'product'})
    },
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
    beforeRouteEnter (to, from, next) {
      this.$cookies.get('userlogin') ? next() : next({ name: 'login', query: { redirect: 'bill' } })
    },
  }
}
</script>

<style>
</style>