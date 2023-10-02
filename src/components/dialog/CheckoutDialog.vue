<script lang="ts">
export default {
    props: {
        modelValue: {
            type: Boolean
        },
        error: {
            type: Boolean,
            required: true
        },
        status_code: {
            type: Number,
            required: true
        },
        status_text: {
            type: String
        }
    },
    computed: {
        show: {
            get(): boolean {
                return this.modelValue
            },
            set(value: boolean) {
                this.$emit('update:modelValue', value)
            }
        }
    },
    watch: {
        status_code(value: number) {
            switch (value) {
                case 201:
                    this.title = "You're command has been successfully created"
                    this.text = 'Now, you can just wait until we confirm your order'
                    break
                default:
                    this.title = 'An Error has occured:'
                    this.text = this.status_text
                    break
            }
        }
    },
    data() {
        return {
            title: undefined as string | undefined,
            text: undefined as string | undefined
        }
    }
}
</script>

<template>
    <v-dialog v-model="show">
        <div class="d-flex justify-center">
            <v-card :width="400">
                <v-alert :type="error ? 'error' : 'success'" :title="title" :text="text">
                    <v-container class="d-flex justify-center">
                        <v-spacer />
                        <v-btn variant="outlined" @click="$router.push('/')">
                            Return to Main Menu
                        </v-btn>
                    </v-container>
                </v-alert>
            </v-card>
        </div>
    </v-dialog>
</template>
