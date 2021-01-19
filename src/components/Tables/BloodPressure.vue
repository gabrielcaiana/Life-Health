<template>
  <v-data-table :headers="headers" :items="bloodPressureItem" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Lista de Pressão Arterial</v-toolbar-title>
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
                    <v-text-field v-model="editedItem.bloodPressure" label="Pressão arterial"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.situation" label="Situação"></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="4" md="4">
                    <v-text-field v-model="editedItem.date" label="Data/Hora"></v-text-field>
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
            <v-card-title class="headline">Deseja realmente deletar a pressão?</v-card-title>
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
          text: 'Pressão Arterial',
          align: 'start',
          sortable: false,
          value: 'bloodPressure'
        },
        { text: 'Situação', value: 'situation' },
        { text: 'Data/Hora', value: 'date' },
        { text: 'Ações', value: 'actions', sortable: false }
      ],
      bloodPressureItem: [],
      editedIndex: -1,
      editedItem: {
        bloodPressure: '',
        situation: '',
        date: ''
      },
      defaultItem: {
        bloodPressure: '',
        situation: '',
        date: ''
      }
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Cadastrar pressão arterial' : 'Editar pressão arterial'
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
      this.bloodPressureItem = [
        {
          bloodPressure: '140/90 mmHg',
          situation: 'NORMAL',
          date: '23/05/2020 - 08:00'
        },
        {
          bloodPressure: '130/90 mmHg',
          situation: 'NORMAL',
          date: '23/05/2020 - 12:00'
        },
        {
          bloodPressure: '160/90 mmHg',
          situation: 'ELEVADA',
          date: '23/05/2020 - 20:00'
        }
      ]
    },

    editItem(item) {
      this.editedIndex = this.bloodPressureItem.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.bloodPressureItem.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.bloodPressureItem.splice(this.editedIndex, 1)
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
        Object.assign(this.bloodPressureItem[this.editedIndex], this.editedItem)
      } else {
        this.bloodPressureItem.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped></style>
