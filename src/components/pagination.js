
function Pagination ({ordersPerPage, totalOrders, paginate}){
    
    const pageNumber = [];
    for(let i = 1; i<= Math.ceil(totalOrders / ordersPerPage); i++){
        pageNumber.push(i);
    }

    return(
        <nav>
            <ul className="pagination">
                {pageNumber.map(number =>{
                    return <li key={number} className="page-item">
                        <a href={void(0)} onClick={()=>paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                })}
            </ul>
        </nav>
    )
}

export default Pagination