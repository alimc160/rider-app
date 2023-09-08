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
      <span class="modal__title">Update {{ file_title }} Status</span>
      <div class="modal__content">
        <form @submit.prevent="updateFileStatus" id="update_file_status">
          <div class="mdl-bdy">
            <input type="hidden" v-model="form_data.attribute">
            <input type="hidden" v-model="form_data.attribute_id">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>Status</label>
                  <select v-model="form_data.status" class="form-control">
                    <option value="in_progress">In Progress</option>
                    <option value="approved">Approved</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <span v-if="errors.status" class="invalid-feedback" role="alert">
                    <strong>{{ errors.status[0] }}</strong>
                  </span>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label>Description</label>
                  <textarea v-model="form_data.description" class="form-control"></textarea>
                  <span v-if="errors.description" class="invalid-feedback" role="alert">
                    <strong>{{ errors.description[0] }}</strong>
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
              form="update_file_status"
              class="btn btn-secondary"
          >update
          </button>
        </div>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UpdateRiderFileStatusModal",
  data() {
    return {
      showModal: false,
      file_title: "File",
      errors: {},
      form_data : {}
    }
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.errors = {};
      this.form_data = {}
    },
    updateFileStatus() {
      axios.post('/api/admin/rider/update-file-status',this.form_data).then(res => {
        this.$swal({
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
        });
        const response_data = {
          field : this.form_data.attribute,
          status : this.form_data.status
        };
        this.closeModal();
        Emitter.emit('UPDATE_STATUS_EVENT',response_data);
      }).catch(error => {
        if (error.response.data.errors) {
          this.errors = error.response.data.errors;
        }
        this.$swal({
          icon: 'error',
          text: error.response.data.message,
        });
      })
    }
  },
  created() {
    Emitter.on('OPEN-UPDATE-FILE-MODAL', (data) => {
      this.showModal = true;
      this.file_title = data.file_name;
      this.form_data.attribute = data.attribute_title
      this.form_data.attribute_id = data.attribute_id
    })
  }
}
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

.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
.mdl-bdy {
  width: 98%;
  margin-top: 11px;
}
.modal-footer {
  width: 100%;
}
</style>