import unittest
from api.service.service import SPService
from api.parser.parser import SPParser


class TestService(unittest.TestCase):
    def test_parse_plate(self):
        """
        Testa se o parse plate funciona corretamente.
        """

        service = SPService(
            license_plate="ABC1C34",
            renavam="11111111111",
            debt_option="ticket"
        )

        self.assertEqual(service.parse_plate("ABC1C34"), "ABC1234")

    def test_parse_plate_lenght(self):
        """
        Testa se o parse plate solta uma exception caso o tamanho da placa seja diferente de 7.
        """

        service = SPService(
            license_plate="ABC1C34",
            renavam="11111111111",
            debt_option="ticket"
        )

        with self.assertRaises(Exception) as context:
            service.parse_plate("ABC1C345")
        self.assertTrue("Placa inválida" in str(context.exception))


class TestParser(unittest.TestCase):
    def test_parse_licensing(self):
        """
        Testa se o parse plate funciona parse_licensing.
        """

        service = SPService(
            license_plate="ABC1C34",
            renavam="11111111111",
            debt_option="ticket"
        )

        search_result = service.debt_search()
        parser = SPParser(search_result)
        result = parser.parse_data()

        self.assertEqual(result, {'Multas': [{'amount': 201.18,
                                              'auto_infraction': '5E5E5E5E',
                                              'description': 'Estacionar em Desacordo com a Sinalizacao.',
                                              'title': 'Infração de Trânsito',
                                              'type': 'ticket'},

                                             {'amount': 131.66,
                                              'auto_infraction': '6F6F6F6F',
                                              'description': 'Trans. Veloc. Super. a Maxima Permitidaem Ate 20%.',
                                              'title': 'Infração de Trânsito',
                                              'type': 'ticket'}]})
