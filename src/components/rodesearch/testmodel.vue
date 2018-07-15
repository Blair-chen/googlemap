<template lang="html">
<div>
    <Button type="primary" @click="modal6 = true">Display dialog box</Button>
    <Modal
        v-model="modal6"
        title="Title"
        :loading="loading"
        @on-ok="asyncOK">
        <p>After you click ok, the dialog box will close in 2 seconds.</p>
    </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                modal6: true,
                loading: true
            }
        },
        methods: {
            asyncOK () {
                setTimeout(() => {
                    this.modal6 = false;
                }, 2000);
            }
        }
    }
</script>
