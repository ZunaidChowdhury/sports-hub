import AddFacilityForm from '@/components/AddFacilityForm';
import { updateFacility } from '@/lib/actions';
import { getSpecificFacility } from '@/lib/data';
import React from 'react'

const EditFacilityPage = async ({params}) => {
    const {id} = await params;

    const facility = await getSpecificFacility(id);

    return (
        <AddFacilityForm  updateFacility={updateFacility} facility={facility} />
    )
}

export default EditFacilityPage