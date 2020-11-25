class ValidaFormulario {
  constructor() {
    this.form = document.querySelector('.formulario');
    this.eventos();
  }

  eventos() {
    this.form.addEventListener('submit', e => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const fieldsValid = this.areFieldsValid();
    const passwordValid = this.isPasswordValid();

    if(fieldsValid && passwordValid) {
      alert('Cadastro enviado!');
      this.form.submit();
    }
  }

  areFieldsValid() {
    let valid = true;

    for(let errorText of this.form.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for(let field of this.form.querySelectorAll('.validar')) {
      const label = (field.previousElementSibling.innerText).toLowerCase();

      if(!field.value) {
        this.handleCreateError(field, `Campo ${label} precisa ser preenchido.`);
        valid = false;
      }

      if(field.classList.contains('cpf')) {
        if(!this.handleValidateCPF(field)) valid = false;
      }

      if(field.classList.contains('usuario')) {
        if(!this.handleValidateUsername(field)) valid = false;
      }
    }
    return valid;
  }

  isPasswordValid() {
    let valid = true;

    const senha = this.form.querySelector('.senha');
    const repetirSenha = this.form.querySelector('.repetir-senha');

    if(senha.value !== repetirSenha.value) {
      valid = false;
      this.handleCreateError(senha, 'Campos senha e repetir senha precisam ser iguais.');
      this.handleCreateError(repetirSenha, 'Campos senha e repetir senha precisam ser iguais.');
    }

    if(senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.handleCreateError(senha, 'Senha precisa ter entre 6 e 12 caracteres.');
    }
    return valid;
  }

  handleCreateError(field, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    field.insertAdjacentElement('afterend', div);
  }

  handleValidateCPF(field) {
    const cpf = new ValidaCPF(field.value);

    if(!cpf.valida()) {
      this.handleCreateError(field, 'CPF inválido.');
      return false;
    }

    return true;
  }

  handleValidateUsername(field) {
    const usuario = field.value;
    let valid = true;
    if(usuario.length < 3 || usuario.length > 12) {
      this.handleCreateError(field, 'Usuário precisa ter entre 3 e 12 caracteres.');
      valid = false;
    }
    if(!usuario.match(/[a-zA-Z0-9]+/g)) {
      this.handleCreateError(field, 'Usuário precisa conter apenas letras e/ou números.');
      valid = false;
    }

    return true;
  }
}

const valida = new ValidaFormulario();