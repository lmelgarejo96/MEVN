<template>
    <div>
        <Nav></Nav> 
        <Form></Form>
    </div>
</template>
<script>
import Nav from './components/Navbar.vue';
import Form from './components/Form.vue';
export default {
    name: 'App',
    components:{
       Nav,
       Form
    }, 

}
</script>