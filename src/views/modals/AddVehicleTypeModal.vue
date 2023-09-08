<template>
  <div>
    <vue-final-modal 
      v-model="showModal" 
      classes="modal-container"
      content-class="modal-content"
      :click-to-close="false"
    >
      <button class="modal__close" @click="closeModal">
        <span aria-hidden="true">&times;</span>
      </button>
      <span class="modal__title">Add Vehicle type</span>
      <div class="modal__content">
        <form @submit.prevent="AddItem()" id="add_vehicle_type">
          <div class="mdl-bdy">
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label>Title</label>
                  <input v-model="form_data.title" type="text" class="form-control" placeholder="Enter name">
                  <span v-if="errors.title" class="invalid-feedback" role="alert">
                    <strong>{{ errors.title[0] }}</strong>
                  </span>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label>Description</label>
                  <input v-model="form_data.description" type="text" class="form-control" placeholder="Enter name">
                  <span v-if="errors.description" class="invalid-feedback" role="alert">
                      <strong>{{ errors.description[0] }}</strong>
                  </span>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label>Vehicle categories</label>
                  <v-select 
                    :options="vehicle_categories" 
                    v-model="form_data.vehicle_category_id"
                    :reduce="item => item.id"  
                    label="title" />
                  <span v-if="errors.vehicle_category_id" class="invalid-feedback" role="alert">
                    <strong>{{ errors.vehicle_category_id[0] }}</strong>
                  </span>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label>Vehicle companies</label>
                  <v-select
                    :options="vehicle_companies"
                    v-model="form_data.vehicle_company_id"
                    :reduce="item => item.id"
                    label="title" />
                  <span v-if="errors.vehicle_company_id" class="invalid-feedback" role="alert">
                    <strong>{{ errors.vehicle_company_id[0] }}</strong>
                  </span>
                </div>
              </div>
              
            </div>
          </div>
        </form>
      </div>
      <div class="modal__action">
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-default" @click="closeModal()">Close</button>
          <button 
            type="submit"
            form="add_vehicle_type" 
            class="btn btn-primary"
          >Add</button>
        </div>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
export default {
  name: 'AddVehicleTypeModal',
  data: () => ({
    form_data         : {},
    errors            : {},
    showModal         : false,
    vehicle_categories: [],
    vehicle_companies : []
  }),

  methods: {
    closeModal() {
      console.log('close modal');
      this.showModal          = false;
      this.form_data          = {};
      this.errors             = {};
      this.vehicle_categories = [];
      this.vehicle_companies = [];
    },

    AddItem() {

      axios.post('/api/admin/vehicle-types', this.form_data
      ).then(response => {      
        this.$swal({
          icon: 'success',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.closeModal();
        Emitter.emit("VEHICLE-TYPES-LIST");

      }).catch(error => {
        if (error.response.data.errors) {
          this.errors = error.response.data.errors;
        }
        this.$swal({
          icon: 'error',
          text: error.response.data.message,
        });

      }).finally(() => {});
      /*axios code ended*/
    },

    getVehicleCategories() {
      axios.get('/api/admin/general/vehicle-categories-list')
      .then(response => {
        this.vehicle_categories = response.data.data;
      }).catch(error => {
        console.error("There was an error!", error);
      }).finally(() => {});
    },
    getVehicleCompanies() {
      axios.get('/api/admin/general/vehicle-companies-list')
          .then(response => {
            this.vehicle_companies = response.data.data;
          }).catch(error => {
        console.error("There was an error!", error);
      }).finally(() => {});
    }
  },

  mounted() {},

  created(){
    Emitter.on("ADD-VEHICLE-TYPE-MODAL", (data) => {
      this.getVehicleCategories();
      this.getVehicleCompanies();
      this.showModal = true;
    });
  },

  destroyed() {
    Emitter.off('ADD-VEHICLE-TYPE-MODAL');  }
};
</script>

<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 70%;
  max-width: 50%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
  border-bottom: inset;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: outset;
}
</style>

<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}

.mdl-bdy {
  width: 98%;
  margin-top: 11px;
}

.modal-footer{
  width: 100%;
}

</style>


