import { Link } from '@inertiajs/react';
import Container from "@/Pages/components/Container";
import FiltersSection from "@/Pages/components/FiltersSection";
import Pagination from "@/Pages/components/Pagination";
import {useEffect, useState} from "react";
import {useFilters, useItems} from "@/Hooks/useFilters";

export default function MainPage({ auth }: { auth: any }) {

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
        <div className={"container"}>
            <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                <div className="flex lg:col-start-2 lg:justify-center">
                    <h1 className="text-3xl font-bold">Welcome In Arc App </h1>
                </div>
                <nav className="-mx-3 flex flex-1 justify-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="btn btn-primary"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="btn btn-primary"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="btn btn-secondary"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>
            <Container>
                <h2 className='text-center mb-5'>Items List</h2>

                <FiltersSection
                    allRarity={allRarity}
                    allFoundIn={allFoundIn}
                    allItemTypes={allItemTypes}
                    filters={filters}
                    setFilters={setFilters}
                />
                <div className="d-grid"
                     style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}
                >
                    {items.map(item => {
                        return (
                            <div className="text-center border">
                                <img src={item.icon} alt={item.item_name}  style={{ maxHeight: "100px" }} className='mx-auto'/>
                                <h5>{item.item_name}</h5>
                                <h6 className='rarity-box' style={{backgroundColor: item.rarity?.color}}>{item.rarity?.rarity_name}</h6>
                                <p className={'d-flex align-items-center justify-content-center'}>{item.price}<img src="images/Icon_Cred.webp" alt="Icon_Cred" style={{ maxHeight: "20px" }} className='ml-1'/></p>
                            </div>
                        )
                    })}
                </div>


                <div className="d-flex justify-content-center mt-4">
                    <Pagination
                        currentPage={currentPage}
                        lastPage={lastPage}
                        fetchItems={fetchItems}
                    />
                </div>
            </Container>
</div>);
}
