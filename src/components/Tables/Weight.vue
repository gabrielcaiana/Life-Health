<template>
  <v-data-table :headers="headers" :items="heightItem" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Lista de Pesos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Adicionar
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6" sm="4" md="4">
                    <v-text-field v-model="editedItem.date" label="Data"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.height" label="Peso"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="gray darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn :color="color" text @click="submit">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Deseja realmente deletar o peso?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="gray darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="red darken-1" text @click="deleteItemConfirm">Deletar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      color: '#09bc8a',
      headers: [
        {
          text: 'Data',
          align: 'start',
          sortable: false,
          value: 'date'
        },
        { text: 'Peso(KG)', value: 'height' },
        { text: 'Ações', value: 'actions', sortable: false }
      ],
      heightItem: [],
      editedIndex: -1,
      editedItem: {
        date: '',
        height: '',
        userId: ''
      },
      defaultItem: {
        date: '',
        height: ''
      }
    }
  },

  computed: {
    ...mapGetters('user', ['user']),
    formTitle() {
      return this.editedIndex === -1 ? 'Cadastrar peso' : 'Editar'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },

  mounted() {
    this.initialize()
  },

  methods: {
    async initialize() {
      const user = this.user.id
      try {
        const { data } = await this.$http('peso')
        data.map(item => {
          if (item.userId === user) {
            this.heightItem.push(item)
          }
        })
      } catch (err) {
        console.log(err)
      }
    },

    editItem(item) {
      this.editedIndex = this.heightItem.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.heightItem.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      try {
        await this.$http.delete(`peso/${this.editedItem.id}`)
        this.heightItem.splice(this.editedIndex, 1)
      } catch (err) {
        console.log(err)
      }
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      try {
        await this.$http.put(`peso/${this.editedItem.id}`, this.editedItem)
        this.$store.dispatch('snackbar/setSnackBar', { msg: 'Peso alterado com sucesso' })
        Object.assign(this.heightItem[this.editedIndex], this.editedItem)
        this.close()
      } catch (err) {
        console.log(err)
        this.$store.dispatch('snackbar/setSnackBar', { msg: 'Falha ao alterar o peso', success: false })
      }
    },

    async edit() {
      this.heightItem = []
      try {
        await this.$http.post('peso', this.editedItem, (this.editedItem.userId = this.user.id))
        this.$store.dispatch('snackbar/setSnackBar', { msg: 'Peso gravado com sucesso' })
        this.close()
        this.initialize()
      } catch (err) {
        console.log(err)
        this.$store.dispatch('snackbar/setSnackBar', { msg: 'Erro ao gravar o peso', success: false })
        this.close()
      }
    },

    async submit() {
      if (this.editedIndex > -1) {
        this.save()
      } else {
        this.heightItem.push(this.editedItem)
      }

      if (this.editedIndex === -1) {
        this.edit()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
