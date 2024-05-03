import { NextPageWithLayout } from "@layouts/Baseof";
import Sidebar from "@layouts/components/sidebar";

const buyPage: NextPageWithLayout = () => {
    return (
        <div>
        <h1>Buy Page</h1>
        </div>
    );
}

buyPage.getLayout = (page) => {
    return (
        <Sidebar>
            {page}
        </Sidebar>
    )
}

export default buyPage;