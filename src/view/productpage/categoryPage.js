


function CategoryPage() {
    return (
        <section class="section-view">
        <loader v-if="$store.state.loading" object="#41b883" color1="#ffffff" color2="#17fd3d" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="80" disableScrolling="false" name="spinning"></loader>
        <div class="item-block">
            <table class="table table-nowrap">
                <thead>
                    <tr>
                        <th scope="col">Kategori ID</th>
                        <th scope="col">Kategori Adı</th>
                        <th scope="col">Detay</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in category" >
                        <th scope="row"><a href="#" class="fw-semibold">#</a></th>
                        <td></td>
                         <td>
                            <router-link  class="btn btn-warning btn-label waves-effect waves-light" to="{name:'categorydetail', params: { id: item.id }}">Detay</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </section>
    )
}

export default CategoryPage