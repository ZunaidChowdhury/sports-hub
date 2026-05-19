import AddFacilityForm from '@/components/AddFacilityForm';
import { addFacility } from '@/lib/actions';

const AddFacilityPage = () => {

    return (
        <AddFacilityForm addFacility={addFacility} />
    )
}

export default AddFacilityPage