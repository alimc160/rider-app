<template>
  <div class="container-fluid">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Riders list</h1>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
      <div class="container-fluid">

        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"></h3>

                <div class="card-tools">
                  <div class="input-group input-group-sm" style="width: 150px;">
                    <input type="text" name="table_search" class="form-control float-right" placeholder="Search"
                           v-model="search_query" @keyup.enter="searchRecord()">
                  </div>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0" style="mx-height: 500px;">
                <table class="table table-head-fixed text-nowrap">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Father name</th>
                    <th>CNIC</th>
                    <th>Phone number</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in items" v-bind:key="item.id">
                    <td> {{ item.name }}</td>
                    <td> {{ item.father_name }}</td>
                    <td> {{ item.cnic }}</td>
                    <td> {{ item.phone_number }}</td>
                    <td> {{ item.email }}</td>
                    <td>

                      <span :class="[
                          'badge ',
                          (item.status==='pending' ? 'badge-warning' : ''),
                          (item.status==='approved' ? 'badge-success' : ''),
                          (item.status==='cancelled' ? 'badge-danger' : ''),
                          (item.status==='in_progress' ? 'badge-primary' : ''),
                          ]"
                          class="text-capitalize"
                      >
                        {{ item.status }}
                      </span>
                    </td>
                    <td>
                      <router-link :to="{ name : 'Rider-detail', params: {id : item.uuid} }" class="btn btn-sm btn-primary">
                        <i class="fas fa-eye"></i>
                        view
                      </router-link>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-tools data-table-footer">
                <div class="ml-2 mt-2 float-left">
		                	<span>
		                		Showing from {{ from || 0 }} to {{ to || 0 }} of {{ total }} entries
		                	</span>
                </div>
                <pagination
                    :total-pages="totalPages"
                    class="float-right mr-2 mt-2"
                    :total="total"
                    :per-page="perPage"
                    :current-page="currentPage"
                    @pagechanged="onPageChange"
                />
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
  </div>
</template>

<script>
import pagination from '@/components/global/pagination.vue';
import { mapActions } from 'vuex';

export default {
  name: "RidersView",
  components: {
    pagination: pagination,
  },
  data() {
    return {
      items: [],
      totalPages: 1,
      perPage: 0,
      total: 0,
      from: 0,
      to: 0,
      currentPage: 1,
      search_query: "",
    }
  },
  methods: {
    onPageChange(page) {
      // console.log(page);
      this.currentPage = page;
      this.getRiders();
    },
    getRiders() {
      axios.get('api/admin/rider/list',{
        params : {
          page: this.currentPage,
          search_query: this.search_query,
        }
      }).then( response => {
        this.items = response.data.data.items;
        this.totalPages = response.data.data.pagination.last_page;
        this.perPage = response.data.data.pagination.per_page;
        this.total = response.data.data.pagination.total;
        this.from = response.data.data.pagination.from;
        this.to = response.data.data.pagination.to;
      }).catch(error => {
        this.$swal({
          icon: 'error',
          text: error?.response?.message,
        });
      })
    },
    searchRecord() {
      this.currentPage = 1;
      this.getRiders()
    },
  },
  mounted() {
    this.getRiders()
  }
}
</script>

<style scoped>

</style>