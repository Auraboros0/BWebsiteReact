export async function fetchWithRetry(
    getData: () => Promise<Response>,
    max: number,
    delay = 1000
): Promise<Response> {
    let iterator = 0;
    while (true) {
        const response = await getData();

        if (response.ok) {
            return response;
        }

        console.log(`Request failed: ${response.status}`);

        await new Promise(resolve =>
            setTimeout(resolve, delay)
        );

        iterator++;
        if (iterator >= max) {
            return response;
        }
    }
}