


Vue.component('product',{
  
   props: {
      premium: {
        type: Boolean,
        required: true
      }
    },

   template: `

   <div class="product">

   <div class="product-image">
      <img :src="image"> 
   </div>

   <div class="product-info">
      <h1> {{title}}</h1>
      <p v-if="inStock">In stock</p>
      <p v-else>Out of stock</p>
      <p>Shipping is : {{shipping}}</p>

      <ul>
         <li v-for="detail in details">{{detail}}</li> 
      </ul>

      <div v-for="(variant,index) in variants"
       :key="variant.variantId"
       class="color-box"
       :style="{backgroundColor:variant.variantColor }"
       @mouseover="updateProduct(index)">  
      </div>


      <button v-on:click="addToCart"
      :disable="!inStock"
      :class="{disabledButton: !inStock}">Add to Cart</button>
       
      <product-review @review-submitted="addReview"></product-review>
   </div>


  
  
  
</div>
   `,
   data(){
      return {
         product: "Socks",
         selectedVariant:0,
         
         brand : "Sablook",
         details:["80% cotton","20% polyester", "Gender-neutral"],
   
         variants: [
            {
               variantId:1,
               variantColor:"green",
               variantImage:"./image/vmSocks-green-onWhite.jpg",
               variantQuantity:10
   
            },
            {
               variantId:2,
               variantColor:"blue",
               variantImage:"./image/vmSocks-blue-onWhite.jpg",
               variantQuantity:0
            }
   
         ],
   
     
      }
   },  
      methods: {
         addToCart() {
           this.$emit("add-to-cart",this.variants[this.selectedVariant].variantId)
         },
         updateProduct(index) {
           this.selectedVariant=index
           console.log(index)
         }
       },
   
       computed: {
          title(){
             return this.brand+ " "+ this.product
          },
          image(){
             return this.variants[this.selectedVariant].variantImage
          },
          
          inStock(){
             return this.variants[this.selectedVariant].variantQuantity
          },

          shipping(){
             if(this.premium) {
                return "free"
             }
             return 50 
          }
       }

      })

      Vue.component('product-review', {
         template: `
              <form class="review-form" @submit.prevent="onSubmit">
              
                <p class="error" v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </p>
        
                <p>
                  <label for="name">Name:</label>
                  <input id="name" v-model="name">
                </p>
                
                <p>
                  <label for="review">Review:</label>      
                  <textarea id="review" v-model="review"></textarea>
                </p>
                
                <p>
                  <label for="rating">Rating:</label>
                  <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                  </select>
                </p>
                    
                <p>
                  <input type="submit" value="Submit">  
                </p>    
              
            </form>
         
         
         `,
         data(){
            return {
               name:null,
               review:null,
               rating:null
            }
         },

         methods: {
            onSubmit(){
               
            }
         }
      })
     
   
 var app = new Vue({
   el:'#app',
   data:{
      premium:false,
      cart:[]
   },

   methods: {
      updateCart(id){
         this.cart.push(id)
      }
   }

  

   

     
   });