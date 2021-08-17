<template>
  <main id="categorias">
    <div class="row">
      <!-- pra mostrar a árvore de categorias -->
      <div class="col-log-4">
        <div class="card">
          <div class="card-body">
            <treeselect
              v-model="value"
              :multiple="true"
              :options="source"
              />
          </div>
        </div>
      </div>

      <!-- para editar a categoria selecionada -->
      <div class="col-lg-8">
        <div class="card">
          <div class="card-body">
            <div class="form">
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Nome da categoria</label>
                <input class="col-sm-8 form-control" type="text">
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">URL da categoria</label>
                <input class="col-sm-8 form-control" type="text">
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Descrição</label>
                <textarea class="col-sm-8 form-control" name="" id="" cols="30" rows="10"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'

export default {
  name: "CategoriasConfig",
  components: {
    Treeselect
  },
  data() {
    return {
      value: null,
      source: [
        {
          id: 'node-1',
          label: 'Node 1',
          children: [
            {
              id: 'node-1-a',
              label: 'Node 1-A',
            },
            {
              id: 'node-1-b',
              label: 'Node 1-b',
            }
          ],
        },
        {
          id: 'node-2',
          label: 'Node 2',
        }
      ]
    }
  }
};
</script>

<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css"></style>