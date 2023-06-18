<template>
    <div class="row">
        <h1 class="title ms-5">Laravel</h1>
        <div class="buttons ms-5">
            <button @click="switchSolution('LaravelCrud')" class="btn btn-light"><i class="fa-solid fa-pen-ruler me-3"></i> Crud</button>
        </div>

        <div class="ms-5 mt-5">
            <component :is="solution"></component>
        </div>
    </div>
</template>

<script>
    import LaravelCrud from '@/components/Solutions/Laravel/Crud.vue'
    export default {
        name:'Php',
        components: {
            LaravelCrud
        },
        data() {
            return {
                solution: ''
            }
        },
        methods: {
            switchSolution(name) {
                this.solution = name
            }
        }
    }
</script>

<style scoped>
.btn {
    width: 20rem;
    height: 4rem;
    border-radius: 2rem;

    font-size: 2rem;
    font-family: var(--text);
    color: #000000;
    font-weight: bold;
}
</style>