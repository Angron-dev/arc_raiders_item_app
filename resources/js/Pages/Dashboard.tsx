import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import Container from './components/Container';
import {useEffect, useState} from "react";
import FiltersSection from "../Pages/components/FiltersSection";
import Pagination from "../Pages/components/Pagination";
import { useFilters, useItems } from "@/Hooks/useFilters";

export default function Dashboard() {
    const { allRarity, allFoundIn, allItemTypes} = useFilters();
    const [filters, setFilters] = useState({
        rarity: '',
        foundIn: '',
        itemType: '',
        itemName: ''
    });
    const {
        items,
        currentPage,
        lastPage,
        fetchItems
    } = useItems(filters);


    useEffect(() => {
        fetchItems(1);
    }, []);

    useEffect(() => {
        fetchItems(1, filters);
    }, [filters]);

    return (
        <AuthenticatedLayout header={undefined}>
            <Container>
                <h2 className='text-center mb-5'>Items List</h2>

                <FiltersSection
                    allRarity={allRarity}
                    allFoundIn={allFoundIn}
                    allItemTypes={allItemTypes}
                    filters={filters}
                    setFilters={setFilters}
                />

                <table className='table'>
                    <thead>
                    <tr className='text-center'>
                        <th>Icon</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Rarity</th>
                        <th>Found In</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    {items.map(item => (
                        <tr key={item.id} className='text-center'>
                            <td className="align-middle">
                                <img
                                    src={item.icon}
                                    alt={item.item_name}
                                    className='mx-auto'
                                    style={{ maxWidth: "75px" }}
                                />
                            </td>

                            <td className="align-middle">{item.item_name}</td>
                            <td className="align-middle">{item.description}</td>
                            <td className="align-middle" style={{color: item.rarity?.color}}>{item?.rarity?.rarity_name ?? '-'}</td>
                            <td className="align-middle">{item?.found_in?.found_in_name ?? '-'}</td>
                            <td className="align-middle">{item?.item_type?.item_type_name ?? '-'}</td>
                            <td className="align-middle">
                                <span className="d-flex align-items-center">
                                    {item.price}
                                    <img src="images/Icon_Cred.webp" alt="Icon_Cred" style={{ maxHeight: "20px" }} className='ml-1'/>
                                </span>
                            </td>
                            <td className="align-middle">
                                <div className="d-flex flex-column">
                                    <button className='btn btn-sm btn-primary mb-2'>View</button>
                                    <button className='btn btn-sm btn-success mb-2'>Edit</button>
                                    <button className='btn btn-sm btn-danger'>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="d-flex justify-content-center mt-4">
                    <Pagination
                        currentPage={currentPage}
                        lastPage={lastPage}
                        fetchItems={fetchItems}
                    />
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
