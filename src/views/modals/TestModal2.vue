<template>
  <div>
    <vue-final-modal 
      v-model="showModal" 
      classes="modal-container"
      content-class="modal-content"
      @click-outside="clickOutside"
      @before-close="beforeClose"
      :click-to-close="false"
    >
      <button class="modal__close" @click="showModal = false">
        <span aria-hidden="true">&times;</span>
      </button>
      <span class="modal__title">Add item</span>
      <div class="modal__content">
        <div class="mdl-bdy">
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" placeholder="Enter name">
                <span  class="invalid-feedback" role="alert">
                    <strong></strong>
                </span>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" placeholder="Enter name">
                <span  class="invalid-feedback" role="alert">
                    <strong></strong>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="modal__action">
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-default" @click="closeModal()">Close</button>
          <button type="submit" class="btn btn-primary">Add</button>
        </div>
      </div>
      <!-- <div class="modal__action">
        <v-button @click="showModal = false">confirm</v-button>
        <v-button @click="showModal = false">cancel</v-button>
      </div> -->
    </vue-final-modal>
  </div>
</template>

<script>
export default {
  name: 'TestModal',
  data: () => ({
    showModal: false
  }),

  methods: {
    closeModal() {
      this.showModal = false;
    },

    AddItem() {
      console.log('here');
    },

    clickOutside() {
      console.log('clickOutside');
      alert('click-outside');
    },

    beforeClose() {
      alert('beforeClose')
    },
  },

  created(){
    Emitter.on("TEST-MODAL2", (data) => {
      this.showModal = true;
    });
  },
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
  max-height: 90%;
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


