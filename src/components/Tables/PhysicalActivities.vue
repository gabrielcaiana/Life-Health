<template>
  <v-data-table :headers="headers" :items="physicalActivities" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Lista de atividades físicas</v-toolbar-title>
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
                    <v-text-field v-model="editedItem.type" label="Tipo de atividade"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.description" label="Descrição"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Calorias"></v-text-field>
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
            <v-card-title class="headline">Deseja realmente deletar a atividade?</v-card-title>
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
          text: 'Tipo de atividade física',
          align: 'start',
          sortable: false,
          value: 'type'
        },
        { text: 'Descrição', value: 'description' },
        { text: 'Calorias', value: 'calories' },
        { text: 'Data/Hora', value: 'date' },
        { text: 'Ações', value: 'actions', sortable: false }
      ],
      physicalActivities: [],
      editedIndex: -1,
      editedItem: {
        type: '',
        description: '',
        calories: '',
        date: ''
      },
      defaultItem: {
        type: '',
        description: '',
        calories: '',
        date: ''
      }
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Cadastrar atividade físicas' : 'Editar atividade físicas'
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
      this.physicalActivities = [
        {
          type: 'Corrida',
          description: 'Corri 2 KM',
          calories: 300,
          date: '11/12/2020'
        },
        {
          type: 'Caminhada',
          description: 'Caminhei 1 KM',
          calories: 340,
          date: '12/12/2020'
        },
        {
          type: 'Musculação',
          description: 'Fiz um treino de 45 minutos',
          calories: 370,
          date: '13/12/2020'
        },
        {
          type: 'r23r523',
          description: 'F235235iz um treino de 45 minutos',
          calories: 33370,
          date: '133/12/2020'
        }
      ]
    },

    editItem(item) {
      this.editedIndex = this.physicalActivities.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.physicalActivities.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.physicalActivities.splice(this.editedIndex, 1)
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
        Object.assign(this.physicalActivities[this.editedIndex], this.editedItem)
      } else {
        this.physicalActivities.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped></style>
