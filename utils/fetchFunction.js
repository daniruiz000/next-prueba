const API_URL = process.env.NEXT_API_URL;

export const fetchFunction = async (formData, showAlert) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      return true;
    } else {
      const errorText = await response.text();
      showAlert(errorText);
    }
  } catch (error) {
    console.error(error);
    showAlert(error);
  }
};
