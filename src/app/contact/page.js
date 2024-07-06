import SectionHeaders from "../components/layout/SectionHeaders"

const Contact = () => {
    return (
        <div className="text-center my-1">
            <SectionHeaders subHeader={'Don\'t hesistate'} mainHeader={'Contact us'} />
            <div className="mt-3">
                <a className='text-4xl underline text-gray-500' href="tel:+91 999 888 7764">+91 999 888 7764</a>

            </div>
        </div>
    )
}

export default Contact