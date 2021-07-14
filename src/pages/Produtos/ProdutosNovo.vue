<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <div class="form">
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Nome produto</label>
              <input type="text" class="col-sm-8 form-control" />
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Preço</label>
                <input type="text" class="col-sm-8 form-control">
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Custo</label>
                <input type="text" class="col-sm-8 form-control">
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Modelo</label>
                <input type="text" class="col-sm-8 form-control">
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Marca</label>
                <input type="text" class="col-sm-8 form-control">
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Peso (gramas)</label>
                <input type="text" class="col-sm-8 form-control">
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Categoria</label>
                <input type="text" class="col-sm-8 form-control">
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Descrição do produto</label>
                <textarea type="text" rows="3" class="col-sm-8 form-control"></textarea>
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Cores</label>
                <select multiple class="col-sm-8 form-control" style="width: 100%;">
                    <option>Alabama</option>
                    <option>Alaska</option>
                    <option>California</option>
                    <option>Delaware</option>
                    <option>Tennessee</option>
                    <option>Texas</option>
                    <option>Washington</option>
                  </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProdutosNovo"
};
</script>

<style>
</style>