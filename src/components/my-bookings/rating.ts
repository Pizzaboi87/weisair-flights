import Swal from "sweetalert2";

const rateFlight = () => {
    Swal.fire({
        title: "Rate Your Flight",
        input: "textarea",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Confirm",
        showLoaderOnConfirm: true,
        /*preConfirm: async (login) => {
            try {
                const githubUrl = `
        https://api.github.com/users/${login}
      `;
                const response = await fetch(githubUrl);
                if (!response.ok) {
                    return Swal.showValidationMessage(`
          ${JSON.stringify(await response.json())}
        `);
                }
                return response.json();
            } catch (error) {
                Swal.showValidationMessage(`
        Request failed: ${error}
      `);
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `${result.value.login}'s avatar`,
                imageUrl: result.value.avatar_url
            });
        }*/
    });
}

export { rateFlight }