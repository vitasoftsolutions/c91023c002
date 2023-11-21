import { base_url } from "../../Components/shared/Url";

const token = sessionStorage.getItem("jwt_token");

async function fetchNameCustom(url) {
    url = `${base_url}/${url}/`;
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.first_name;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export default async function customName(url) {
    try {
        const name = await fetchNameCustom(url);
        console.log(name);
        return name;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
