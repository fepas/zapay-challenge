from ..detran.api import API


class SPService:
    """
    Conecta com o webservice do Detran-SP.
    """

    def __init__(self, **kwargs):
        """
        Construtor.
        """

        self.params = kwargs
        self.methods = {
            "ticket": "ConsultaMultas",
            "ipva": "ConsultaIPVA",
            "dpvat": "ConsultaDPVAT",
            "licensing": "ConsultaLicenciamento"
        }

    def get_json_response(self, method):
        """
        Pega a resposta da requisição em json.
        """

        api = API(self.parse_plate(self.params["license_plate"]),
                  self.params["renavam"],
                  self.methods[method])
        return api.fetch()

    def debt_search(self):
        """
        Pega os débitos de acordo com a opção passada.
        """

        debts = []

        if self.params['debt_option'] in self.methods.keys():
            response_json = self.get_json_response(self.params['debt_option'])
            debts = [response_json]

        elif self.params['debt_option'] == "all":
            for debt in self.methods.keys():
                response_json = self.get_json_response(debt)
                debts.append(response_json)

        else:
            raise Exception("opção inválida")

        return debts

    def parse_plate(self, license_plate):
        """
        Faz o parse da placa de transito caso seja necessário.
        Verifica se a placa possui o tamanho certo, e caso o 5o caractere 
        da placa seja uma letra, converte a placa para o padrão brasileiro.
        """

        if len(license_plate) != 7:
            raise Exception("Placa inválida")

        conversion_table = {
            "A": "0",
            "B": "1",
            "C": "2",
            "D": "3",
            "E": "4",
            "F": "5",
            "G": "6",
            "H": "7",
            "I": "8",
            "J": "9",
        }

        new_plate = [char for char in license_plate]

        if new_plate[4].isalpha():
            new_plate[4] = conversion_table[new_plate[4]]

        return ''.join(new_plate)
