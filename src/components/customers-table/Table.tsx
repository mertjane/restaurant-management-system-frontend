import "./table.component.scss";
import Pagination from "../pagination/Pagination";
import { SecondarySortIcon } from "../icons/Icons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useCustomer } from "../../hooks/useCustomer";

const Table: React.FC = () => {
    const { content, totalPages, loading, error } = useSelector(
        (state: RootState) => state.customers
    );

    // Use the custom hook
    const { handlePageChange, isSearching, searchError, currentPage } =
        useCustomer();

    return (
        <div className="table-container">
            <h2>Customers</h2>
            {loading && isSearching ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error ? error : searchError}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>
                                # <SecondarySortIcon />
                            </th>
                            <th>
                                Name <SecondarySortIcon />
                            </th>
                            <th>
                                Email <SecondarySortIcon />
                            </th>
                            <th>
                                Phone <SecondarySortIcon />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(content) &&
                            content.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
            <Pagination
                currentPage={currentPage} // Show the correct current page in the UI
                totalPages={totalPages}
                onPageChange={handlePageChange} // Pass function to handle page change
            />
        </div>
    );
};

export default Table;
