import Vue from 'vue'
import Vuex from 'vuex'
import firebase, { database } from '../firebase'
import convertToRupiah from '../utils/convertRupiah.js';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        products: [],
        product: [],
        cart: [],
        productsQty: 0,
        totalPriceProducts: 0,
        isLoading: false,
        error: {email: "", password: ""},
        user: null
    },
    getters: {
        getCurrentProducts: state => state.products,
        getCurrentProduct: state => state.product,
        getCurrentCart: state => state.cart,
        getCurrentProductsQty: state => state.productsQty,
        getCurrentTotalPriceProducts: state => convertToRupiah(state.totalPriceProducts),
        getCurrentIsLoading: state => state.isLoading,
        getCurrentIsLogin: state => state.isLogin,
        getCurrentError: state => state.error,
        getCurrentUser: state => state.user,
    },
    mutations: { // Synchronous
        setProducts(state, payload) {
            state.products = payload
        },
        setSingleProduct(state, payload) {
            state.product = payload
        },
        addProductToCart(state, payload) {
            const addProductExistsInCart = state.cart.find(product => product.id === parseInt(payload.id) ? true : false)
            
            state.cart = addProductExistsInCart ? state.cart.map(product =>
                product.id === parseInt(payload.id) ? {...product, qty: product.qty + 1, totalPrice: product.price * (product.qty + 1)} : product
            )
            : [...state.cart, {...payload, qty: 1, totalPrice: payload.price}]
        },
        reduceProductFromcart(state, payload) {
            const reduceProductExistsInCart = state.cart.find(product => product.id === parseInt(payload.id) ? true : false)
            
            state.cart = reduceProductExistsInCart ? state.cart.map(product =>
                product.id === parseInt(payload.id) ? {...product, qty: product.qty - 1, totalPrice: product.price * (product.qty - 1)} : product
            )
            : [...state.cart]
        },
        removeProductFromCart(state, payload) {
            state.cart = state.cart.filter(product =>
                product.id !== parseInt(payload.id)
            )
        },
        setCountCart(state) {
            const sumAllQtyProducts = (accumulator, currentValue) => accumulator + currentValue
            let arrayQty = state.cart.map(product => product.qty)
            state.productsQty = state.cart.length !== 0 ? arrayQty.reduce(sumAllQtyProducts) : 0
        },
        setCartTotalPrice(state) {
            const sumAllPriceProducts = (accumulator, currentValue) => accumulator + currentValue
            let arrayPrice = state.cart.map(product => product.totalPrice)
            state.totalPriceProducts =  state.cart.length !== 0 ? arrayPrice.reduce(sumAllPriceProducts) : 0
        },
        setIsLoading(state, payload) {
            state.isLoading = payload
        },
        setIsLogin(state, payload) {
            state.isLogin = payload
        },
        setIsError(state, {email, password}) {
            if (email || email === "") {
                state.error.email = email
            }
            if (password || password === "") {
                state.error.password = password
            }
        },
        setUser(state, payload) {
            state.user = payload
        },
    },
    actions: { // Asynchronous
        setProductsFromFirebase(state) {
            const urlProducts = database.ref("products")
            return new Promise((resolve) => {
                urlProducts.on("value", (snapshot) => {
                    const data = snapshot.val();
                    state.commit("setProducts", data)
                    resolve(data)
                })
            })
        },
        setSingleProductFromFirebase(state, productId) {
            const urlProducts = database.ref(`products/${productId}`)
            return new Promise((resolve) => {
                urlProducts.on("value", (snapshot) => {
                    const data = snapshot.val()
                    state.commit("setSingleProduct", data)
                    resolve(data)
                })
            })
        },
        registerUserFirebase(state, {email, password}) {
            return new Promise((resolve, reject) => {
                state.commit("setIsLoading", true)
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    state.commit("setIsLoading", false)
                    resolve(true)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    // const errorMessage = error.message;
                    if(errorCode === "auth/email-already-in-use") {
                        state.commit("setIsError", {...state.error, email: "Email already in use"})
                    }
                    if(errorCode === "auth/invalid-email") {
                        state.commit("setIsError", {...state.error, email: "Invalid format email"})
                    }
                    if(errorCode === "auth/weak-password") {
                        state.commit("setIsError", {...state.error , password: "Password at least 6 character"})
                    }
                    state.commit("setIsLoading", false)
                    reject(false)
                })
            })
        },
        loginUserFirebase(state, {email, password}) {
            return new Promise((resolve, reject) => {
                state.commit("setIsLoading", true)
                firebase.auth().signInWithEmailAndPassword(email, password)
                .then((res) => {
                    // Signed in
                    state.commit("setIsLogin", true)
                    const { uid, email } = res.user
                    localStorage.setItem('user', JSON.stringify({ uid, email, isLogin: true }))
                    state.commit("setUser", {uid, email, isLogin: true})
                    state.commit("setIsLoading", false)
                    resolve(true)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    // const errorMessage = error.message
                    if(errorCode === "auth/invalid-email") {
                        state.commit("setIsError", {...state.error, email: "Invalid Email"})
                    }
                    if(errorCode === "auth/user-not-found") {
                        state.commit("setIsError", {...state.error, email: "User did not found"})
                    }
                    if(errorCode === "auth/wrong-password") {
                        state.commit("setIsError", {email : "Email or Password is wrong", password: "Email or Password is wrong"})
                    }
                    state.commit("setIsLoading", false)
                    reject(false)
                })
            })
        },
        getUserAuthenticated(state) {
            if(localStorage.getItem('user')) {
                const { uid, email, isLogin} = JSON.parse(localStorage.getItem('user'))
                state.commit("setUser", {uid, email, isLogin})
            }
        }
    },
})

export default store