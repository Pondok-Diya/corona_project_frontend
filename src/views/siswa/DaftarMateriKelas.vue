<template>
  <div>
    <b-row class="card-dest">
      <b-col>
        <b-card :title="title">
          <b-card-text>
            <b-row v-for="(i,index) in items" :key="index" class="card-dest">
              <b-col v-for="(j,index) in i" :key="index" md="4">
                <materi-kelas :uuid="j.uuid_mapel" :mapel="j.mapel" />
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import MateriKelas from "../../components/siswa/MateriKelas";
import logout from "../logout";
import { siswa } from "../../api";
export default {
  name: "DaftarMateriKelas",
  components: { MateriKelas },
  data() {
    return {
      items: [],
      title: ""
    };
  },
  methods: {
    async loadData() {
      try {
        let data = await siswa.getMateriKelas();
        this.items = this.triple(data.data.mapel);
        this.title = `Daftar Materi Kelas ${data.data.kelas.kelas}`
      } catch (err) {
        logout.clear();
      }
    },
    triple(list){
      let hasil = []
      let lis = []
      for(let i = 0; i < list.length; i++){
        lis.push(list[i])
        if(lis.length == 3) {
          hasil.push(lis)
          lis = []
        } else if (lis.length < 3 && i == list.length-1){
          hasil.push(lis)
        }
      }
      return hasil
    }
  },
  mounted() {
    this.loadData();
  },
};
</script>
<style scoped>
.card-dest {
  margin-top: 30px;
}
</style>