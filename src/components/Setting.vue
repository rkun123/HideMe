<template>
    <v-container>
        <v-row>
            <v-col>X Padding</v-col>
            <v-col><v-slider :min="-30" :max="30" v-model="paddingX" @change="setPaddingX"/></v-col>
        </v-row>
        <v-row>
            <v-col>Y Padding</v-col>
            <v-col><v-slider :min="-30" :max="30" v-model="paddingY" @change="setPaddingY"/></v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    computed: {
        ...mapState({
            paddingX: state => state.imageOption.paddingX,
            paddingY: state => state.imageOption.paddingY,
        })
    },
    methods: {
        ...mapMutations(['setPaddingX', 'setPaddingY'])
    }
}
</script>