$(document).ready(function(){
	$("#anskey-submit").click(function(e){
		e.preventDefault();
		

		var ans_key_url = $("#ans-key-url").val();
		var category = $("#category").val();
		// var state = $("#state").val();
		var state = "NONE";
		var dob = "";
		var aspirant_group = $("#aspirant-group").val();
		// alert(ans_key_url);

		$.ajax({
			type: "POST",
			url: "php/anskey.php",
			data: {ans_key_url: ans_key_url},
			cache: false,
			beforeSend: function()
			{
				$("#anskey-submit").val("getting data...");
			},
			success: function(response)
			{
				console.log(response);
				var response = JSON.parse(response);
				$("#anskey-submit").val("Submit");
				// console.log(response);
				if(response[0].trim() == "data-received")
				{
					// start second json request
					// alert(response[0].trim());

					$("#show-answer-key").html(response[1].replaceAll('src="/per','src="https://ssc.digialm.com///per'));

					var dom_parser = new DOMParser();
					dom_parser = dom_parser.parseFromString(response[1],"text/html");
					// console.log(dom_parser);

					var cand_info = dom_parser.getElementsByTagName("table")[0];
					cand_info = cand_info.getElementsByTagName("td");

					var roll_no = cand_info[1].textContent;
					var cand_name = cand_info[3].textContent;
					var venue_name = cand_info[5].textContent;
					var exam_date = cand_info[7].textContent;
					var exam_time = cand_info[9].textContent;
					var subject = cand_info[11].textContent;
					var questions = "";
					var save_marks = "";

					if(subject.toLowerCase().includes("chsl") && subject.toLowerCase().includes("ii"))
					{
						for(var totalMarks=0,s=0;s<5;s++)
						{
							if(s == 0 || s == 1)
							{
								for(var right=0,notAttempted=0,bonus=0,i=30*s;i<30*s+30;i++)
								{
									" -- " === document.getElementsByClassName("question-pnl")[i].getElementsByClassName("bold")[5].textContent&&notAttempted++;
									try{
										document.getElementsByClassName("question-pnl")[i].getElementsByClassName("rightAns")[0].textContent[0]===document.getElementsByClassName("question-pnl")[i].getElementsByClassName("bold")[5].textContent&&right++
									}
									catch{bonus++}
								}

								wrong = 30-notAttempted-right-bonus;
								marks=3*(right+bonus)-wrong;
								totalMarks+=marks;
								var sub = s+1;
								save_marks += marks+"-";
								
								questions += (30-notAttempted)+"-"+notAttempted+"-"+right+"-"+wrong+"-"+bonus+"-"+marks+"|";
								console.log("Subject : "+sub+"\nAttempted : "+(30-notAttempted)+"\nRight Answers : "+right+"\nWrong Answers : "+wrong+"\nBonus : "+bonus+"\nMarks : "+marks);
							}
							if(s == 2)
							{
								for(var right=0,notAttempted=0,bonus=0,i=60;i<100;i++)
								{
									" -- " === document.getElementsByClassName("question-pnl")[i].getElementsByClassName("bold")[5].textContent&&notAttempted++;
									try{
										document.getElementsByClassName("question-pnl")[i].getElementsByClassName("rightAns")[0].textContent[0]===document.getElementsByClassName("question-pnl")[i].getElementsByClassName("bold")[5].textContent&&right++
									}
									catch{bonus++}
								}

								wrong = 40-notAttempted-right-bonus;
								marks=3*(right+bonus)-wrong;
								totalMarks+=marks;
								var sub = s+1;
								save_marks += marks+"-";
								
								questions += (40-notAttempted)+"-"+notAttempted+"-"+right+"-"+wrong+"-"+bonus+"-"+marks+"|";
								console.log("Subject : "+sub+"\nAttempted : "+(40-notAttempted)+"\nRight Answers : "+right+"\nWrong Answers : "+wrong+"\nBonus : "+bonus+"\nMarks : "+marks);
							}
							if(s == 3)
							{
								for(var right=0,notAttempted=0,bonus=0,i=100;i<120;i++)
								{
									" -- " === document.getElementsByClassName("question-pnl")[i].getElementsByClassName("bold")[5].textContent&&notAttempted++;
									try{
										document.getElementsByClassName("question-pnl")[i].getElementsByClassName("rightAns")[0].textContent[0]===document.getElementsByClassName("question-pnl")[i].getElementsByClassName("bold")[5].textContent&&right++
									}
									catch{bonus++}
								}

								wrong = 20-notAttempted-right-bonus;
								marks=3*(right+bonus)-wrong;
								totalMarks+=marks;
								var sub = s+1;
								save_marks += marks+"-";
								
								questions += (20-notAttempted)+"-"+notAttempted+"-"+right+"-"+wrong+"-"+bonus+"-"+marks+"|";
								console.log("Subject : "+sub+"\nAttempted : "+(20-notAttempted)+"\nRight Answers : "+right+"\nWrong Answers : "+wrong+"\nBonus : "+bonus+"\nMarks : "+marks);
							}
							if(s == 4)
							{
								for(var right=0,notAttempted=0,bonus=0,i=120;i<135;i++)
								{
									" -- " === document.getElementsByClassName("question-pnl")[i].getElementsByClassName("bold")[5].textContent&&notAttempted++;
									try{
										document.getElementsByClassName("question-pnl")[i].getElementsByClassName("rightAns")[0].textContent[0]===document.getElementsByClassName("question-pnl")[i].getElementsByClassName("bold")[5].textContent&&right++
									}
									catch{bonus++}
								}
								// alert(bonus);
								wrong = 15-notAttempted-right-bonus;
								marks=3*(right+bonus)-wrong;
								if(marks < 0){marks = 0;}
								save_marks += marks+"-";
								save_marks += totalMarks+"-";
								totalMarks+=marks;
								var sub = s+1;

								questions += (15-notAttempted)+"-"+notAttempted+"-"+right+"-"+wrong+"-"+bonus+"-"+marks+"="+totalMarks;
								console.log("Subject : "+sub+"\nAttempted : "+(15-notAttempted)+"\nRight Answers : "+right+"\nWrong Answers : "+wrong+"\nBonus : "+bonus+"\nMarks : "+marks);
							}
						}
						save_marks += totalMarks;
						console.log("\nTotal Marks : "+totalMarks);
						// console.log(questions);
						// console.log(save_marks);

						var grab_url = window.location.href;
						var url = new URL(grab_url);
						var url_source = url.searchParams.get("source");
						// console.log(url_source);
						if(url_source != null)
						{
							var user_source = url_source;
							localStorage.setItem('source',url_source);
						}
						else{
							if(localStorage.getItem("source") != null)
							{
								var user_source = "after_"+localStorage.getItem("source");
							}
							else{
								var user_source = "NONE";
							}
						}

						var anskey_info = {ans_key_url:ans_key_url,category:category,state:state,dob:dob,aspirant_group:aspirant_group,roll_no:roll_no,cand_name:cand_name,venue_name:venue_name,exam_date:exam_date,exam_time:exam_time,subject:subject,questions:questions,save_marks:save_marks,user_source:user_source};
						// console.log(anskey_info);

						$.ajax({
							type: "POST",
							url: "php/anskey_eval.php",
							data: {anskey_info : anskey_info},
							cache: false,
							beforeSend: function()
							{
								$("#anskey-submit").val("Calculating...");
							},
							success: function(get_response)
							{
								console.log(get_response);
								var get_response = JSON.parse(get_response);
								$("#anskey-submit").val("Done");
								if(get_response[0] == "stored")
								{
									// document.location.reload();
									location.href = "https://rankmitra.in/ssc/chsl/mains/rank.php";
								}
								else{
									console.log(get_response[0]);
								}
							}
						});
					}
					else{
						alert("Are you sure answer key you submitting is of SSC CHSL Mains exam.");
					}

					
					// end second request
				}
				else if(response[0].trim() == "keynotvalid")
				{
					alert("Your Answer Key URL Does Not Seem To Be Valid.");
				}
				else if(response[0].trim() == "already-exists")
				{
					// window.location.reload();
					location.href = "https://rankmitra.in/ssc/chsl/mains/rank.php";
				}
				else{
					// alert(response);
					console.log(response);
					
				}
			}
		});

	});
});



$(document).ready(function(){
	$("#rollno-form").submit(function(e){
		e.preventDefault();
		var get_rollno = $("#roll-no").val();
		$.ajax({
			type: "POST",
			url: "php/rollnologin.php",
			data:{get_rollno:get_rollno},
			beforeSend: function()
			{
				$("#submit-rollno").text("Submitting...");
			},
			success: function(roll_response)
			{
				$("#submit-rollno").val("Submit");
				console.log(roll_response);
				if(roll_response.trim() == "logged-in")
				{
					location.href = "https://rankmitra.in/ssc/chsl/mains/rank.php";
				}
				else{alert(roll_response.trim());}
			}
		});
	});
});


$(document).ready(function(){
	var grab_url = window.location.href;
	var url = new URL(grab_url);
	var url_source = url.searchParams.get("source");
	if(url_source != null)
	{
		var user_source = url_source;
		localStorage.setItem('source',url_source);
	}
});