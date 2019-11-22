$(function() {
	let films = [
		{genre: "Animation", title: "Wildfood", duration: "3:47", date: "2014-07-16"},
		{genre: "Film", title: "The Deer", duration: "6:24", date: "2014-02-28"},
		{genre: "Animation", title: "The Ghost", duration: "11:40", date: "2012-04-10"},
		{genre: "Film", title: "Animals", duration: "6:40", date: "2005-12-21"},
		{genre: "Animation", title: "Wagons", duration: "21:40", date: "2007-04-12"},
	];

	let results = [];

	function renderContent(array) {
		// xoá hết cái ban đầu đi render lại
		$('tbody').empty();
		//lặp object films để đổ dữ liệu
		array.forEach( function(element) {
			$('tbody').append(`
				<tr>
					<td>${element.genre}</td>
					<td>${element.title}</td>
					<td>${element.duration}</td>
					<td>${element.date}</td>
				</tr>
			`);
		});
	}
	renderContent(films);

	//Sort theo genre
	let ascending = true; //xuôi
	function genre_sort(array) {
		let newArray = [...array]; //tạo bản sao, chỉ sort rồi render bản sao thôi, còn array đầu vào vẫn giữ nguyên

		if (ascending == true) {
			newArray.sort((a,b) => {
				if (a.genre < b.genre) return -1;
				else if (a.genre > b.genre) return 1;
				else return 0;
			});
			renderContent(newArray);
			$('i.fa-sort.genre').hide();
			$('i.fa-sort-up.genre').hide();
			$('i.fa-sort-down.genre').show();

			ascending = false;
		} else {
			newArray.sort((a,b) => {
				if (a.genre > b.genre) return -1;
				else if (a.genre < b.genre) return 1;
				else return 0;
			});
			renderContent(newArray);
			$('i.fa-sort.genre').hide();
			$('i.fa-sort-down.genre').hide();
			$('i.fa-sort-up.genre').show();
			ascending = true;
		}		
	}

	$('th:nth-child(1)').on('click', function() {
		if (results[0]) genre_sort(results);
		else genre_sort(films);
	});

	//Search
	$('[type="search"]').on('input', function() { //Luôn show hết data lên bảng khi input rỗng
		if ($(this).val() == '') {
			renderContent(films);
			$('#no_result').text(``);
			$('i.fa-sort.genre').show();
			$('i.fa-sort-down.genre').hide();
			$('i.fa-sort-up.genre').hide();
		}
	});

	$(document).on('keypress', function(event) {		
		if (event.key == 'Enter') { //User ấn Enter mới bắt đầu search
			results = [];
			$('i.fa-sort.genre').show();
			$('i.fa-sort-down.genre').hide();
			$('i.fa-sort-up.genre').hide();

			let input = $('[type="search"]').val().trim().toLowerCase();
			if (input == '') renderContent(films);
			else {
				films.forEach( function(element, index) {
					for (let prop in element) {
						//Nếu data có chứa input
						if (element[prop].toLowerCase().indexOf(input) != -1) {
							results.push(element);
							break; //prop nào chứa input thì push element (object) của prop đó vào array results, sau đó BREAK luôn để thoát khỏi element hiện tại, tiếp tục với element tiếp theo
						}
					}
				});

				if (!results[0]) $('#no_result').text(`No results`);
				else $('#no_result').text(``);
				renderContent(results);
			}


			console.log(results);

			
		}
	});




});