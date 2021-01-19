<template>
  <v-data-table :headers="headers" :items="foodItem" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Lista de Alimentos</v-toolbar-title>
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
                    <v-text-field v-model="editedItem.name" label="Nome"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.description" label="Descrição"></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="4" md="4">
                    <v-text-field v-model="editedItem.calories" label="Calorias"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.date" label="Data"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="gray darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="darken-1" :color="color" text @click="save">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Deseja realmente deletar o alimento?</v-card-title>
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
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      color: '#09bc8a',
      headers: [
        {
          text: 'Nome',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Descrição', value: 'description' },
        { text: 'Número de calorias', value: 'calories' },
        { text: 'Data/Hora', value: 'date' },
        { text: 'Ações', value: 'actions', sortable: false }
      ],
      foodItem: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        description: '',
        calories: '',
        date: ''
      },
      defaultItem: {
        name: '',
        description: '',
        calories: '',
        date: ''
      }
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Cadastrar alimento' : 'Editar alimento'
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

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.foodItem = [
        {
          name: 'Café da manhã',
          description: 'Suco de laranja e uma torrada',
          calories: 190,
          date: '15/01/2021'
        },
        {
          name: 'Almoço',
          description: 'Frango grelhado com arroz integral',
          calories: 250,
          date: '15/01/2021'
        },
        {
          name: 'Jantar',
          description: 'Batata doce com nozes',
          calories: 130,
          date: '15/01/2021'
        }
      ]
    },

    editItem(item) {
      this.editedIndex = this.foodItem.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.foodItem.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.foodItem.splice(this.editedIndex, 1)
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.foodItem[this.editedIndex], this.editedItem)
      } else {
        this.foodItem.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped></style>
